import { FormEvent, useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { NoteData, Tag } from "../App";
import "./NoteForm.css";

type NoteFormProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
	onSubmit,
	onAddTag,
	availableTags,
	title = "",
	markdown = "",
	tags = [],
}: NoteFormProps) {
	const [title1, setTitle1] = useState<string>("");
	const [markdown1, setMarkdown1] = useState<string>("");
	const titleRef = useRef(null);
	const markdownRef = useRef(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const navigate = useNavigate();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		console.log(title1);
		console.log(markdown1);

		onSubmit({
			title: title1,
			markdown: markdown1,
			tags: selectedTags,
		});

		navigate("..");
	}

	const style = {
		control: (base) => ({
			...base,
			border: 0,
			// This line disable the blue border
			boxShadow: "none",
		}),
	};

	return (
		<>
			<form>
				<div className="edit-container">
					<div className="edit-title-container">
						<input
							className="title-input"
							type="text"
							ref={titleRef}
							onChange={(e) => setTitle1(e.target.value)}
							required
							defaultValue={title}
						/>
					</div>
					<div className="edit-tag-container">
						<CreatableReactSelect
							styles={style}
							className="react-select"
							onCreateOption={(label) => {
								const newTag = { id: uuidV4(), label };
								onAddTag(newTag);
								setSelectedTags((prev) => [...prev, newTag]);
							}}
							value={selectedTags.map((tag) => {
								return { label: tag.label, value: tag.id };
							})}
							options={availableTags.map((tag) => {
								return { label: tag.label, value: tag.id };
							})}
							onChange={(tags) => {
								setSelectedTags(
									tags.map((tag) => {
										return { label: tag.label, id: tag.value };
									})
								);
							}}
							isMulti
						/>
					</div>
				</div>
				<div className="markdown-area">
					<textarea
						rows="4"
						cols="50"
						onChange={(e) => setMarkdown1(e.target.value)}
						className="markdown-input"
						defaultValue={markdown}
						required
						ref={markdownRef}
					/>
				</div>
				<div className="form-button-container">
					<div className="save-btn" onClick={handleSubmit}>
						<FaSave className="save-button" />
						<span>Save</span>
					</div>
					<Link to="..">
						<div className="cancel-btn">
							<MdCancel className="cancel-button" />
							<span>Cancel</span>
						</div>
					</Link>
				</div>
			</form>
		</>
	);
}

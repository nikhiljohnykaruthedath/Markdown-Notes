import { useMemo, useState } from "react";
import {
	Badge,
	Button,
	Card,
	Col,
	Form,
	Modal,
	Row,
	Stack,
} from "react-bootstrap";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";
import "./NoteList.css";

type SimplifiedNote = {
	tags: Tag[];
	title: string;
	id: string;
};

type NoteListProps = {
	availableTags: Tag[];
	notes: SimplifiedNote[];
	onDeleteTag: (id: string) => void;
	onUpdateTag: (id: string, label: string) => void;
};

type EditTagsModalProps = {
	show: boolean;
	availableTags: Tag[];
	handleClose: () => void;
	onDeleteTag: (id: string) => void;
	onUpdateTag: (id: string, label: string) => void;
};

export function NoteList({
	availableTags,
	notes,
	onUpdateTag,
	onDeleteTag,
}: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState("");
	const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

	const filteredNotes = useMemo(() => {
		return notes.filter((note) => {
			return (
				(title === "" ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every((tag) =>
						note.tags.some((noteTag) => noteTag.id === tag.id)
					))
			);
		});
	}, [title, selectedTags, notes]);

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
			<div>testing</div>
			<div className="navbar">
				<div className="navbar-title">Cheatsheets</div>
				<div className="navbar-items">
					<Link to="/new">
						<div className="navbar-item">
							<IoMdAdd className="add-button" />
							<span>New</span>
						</div>
					</Link>
					<div onClick={() => setEditTagsModalIsOpen(true)}>
						<div className="navbar-item">
							<MdEdit className="edit-button" />
							<span>Tags</span>
						</div>
					</div>
				</div>
			</div>
			<form className="">
				<div className="search-container">
					<div className="search-title-container">
						<input
							className="title-input"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="search-tag-container">
						<ReactSelect
							className="react-select"
							styles={style}
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
			</form>
			<div className="all-notes-grid">
				{filteredNotes.map((note) => (
					<div key={note.id}>
						<NoteCard id={note.id} title={note.title} tags={note.tags} />
					</div>
				))}
			</div>
			<EditTagsModal
				onUpdateTag={onUpdateTag}
				onDeleteTag={onDeleteTag}
				show={editTagsModalIsOpen}
				handleClose={() => setEditTagsModalIsOpen(false)}
				availableTags={availableTags}
			/>
		</>
	);
}

export function NoteCard({ id, title, tags }: SimplifiedNote) {
	return (
		<>
			<Link to={`/${id}`}>
				<div className="note-item">
					<div className="note-title">{title}</div>
					{tags.length > 0 && (
						<div className="note-tag-list">
							{tags.map((tag) => (
								<div className="tag-item" key={tag.id}>
									{tag.label}
								</div>
							))}
						</div>
					)}
				</div>
			</Link>
		</>
	);
}

function EditTagsModal({
	availableTags,
	handleClose,
	show,
	onDeleteTag,
	onUpdateTag,
}: EditTagsModalProps) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Tags</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Stack gap={2}>
						{availableTags.map((tag) => (
							<Row key={tag.id}>
								<Col>
									<Form.Control
										className="shadow-none"
										type="text"
										value={tag.label}
										onChange={(e) => onUpdateTag(tag.id, e.target.value)}
									/>
								</Col>
								<Col xs="auto">
									<Button
										onClick={() => onDeleteTag(tag.id)}
										variant="outline-danger"
									>
										Delete
									</Button>
								</Col>
							</Row>
						))}
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

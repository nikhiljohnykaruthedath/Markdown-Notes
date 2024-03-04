import { MdDelete, MdEdit } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import "./Note.css";
import { useNote } from "./NoteLayout";

type NoteProps = {
	onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
	const note = useNote();
	const navigate = useNavigate();

	return (
		<>
			<div className="note">
				<div>testing</div>
				<div className="note-option-items">
					<Link to={`/${note.id}/edit`}>
						<div className="note-option-item">
							<MdEdit className="edit-button" />
							<span>Edit</span>
						</div>
					</Link>
					<div
						className="note-option-item"
						onClick={() => {
							onDelete(note.id);
							navigate("/");
						}}
					>
						<MdDelete className="delete-button" />
						<span>Delete</span>
					</div>
				</div>
				<div className="note-title">{note.title}</div>
				{note.tags.length > 0 && (
					<div className="show-note-tag-list">
						{note.tags.map((tag) => (
							<div className="show-note-tag-list-item">{tag.label}</div>
						))}
					</div>
				)}
				<div className="divider"></div>
				<div className="note-text">
					<ReactMarkdown>{note.markdown}</ReactMarkdown>
				</div>
			</div>
		</>
	);
}

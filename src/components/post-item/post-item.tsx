import React from 'react';
import {Post} from "../../types";
import {DeleteIcon} from "../icons";

interface PostItemProps {
    post: Post,
    handleEditPost: (post: Post, filed: string, content: string | null) => void,
    handleDeletePost: (post: Post) => void,
}

const PostItem = ({post, handleEditPost, handleDeletePost}: PostItemProps) => {
    return (
        <>
            <td className="px-4 text-center">{post.id}</td>
            <td className="px-4 text-center" contentEditable suppressContentEditableWarning={true} onBlur={(e) => handleEditPost(post, "username", e.target.textContent)}>{post.user.username}</td>
            <td className="px-4 text-center" contentEditable suppressContentEditableWarning={true} onBlur={(e) => handleEditPost(post, "company", e.target.textContent)}>{post.user.company.name}</td>
            <td className="px-4 text-center" contentEditable suppressContentEditableWarning={true} onBlur={(e) => handleEditPost(post, "title", e.target.textContent)}>{post.title}</td>
            <td className="px-4 text-center">{post.comments.length}</td>
            <td className="px-4 text-center">
                <button onClick={() => handleDeletePost(post)}>
                    <DeleteIcon />
                </button>
            </td>
        </>
    );
};

export {PostItem};
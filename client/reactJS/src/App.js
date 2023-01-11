import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const client = axios.create({
	baseURL: 'http://127.0.0.1:8000/api/notes',
});

const App = () => {
	const [title, setTitle] = useState('');
	const [content, setBody] = useState('');
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);

	// GET with Axios
	useEffect(() => {
		const fetchPost = async () => {
			try {
				let response = await client.get('?_limit=10');
				setPosts(response.data.notes);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPost();
	}, []);

	//GET next/previous page
	const getPage = async (page) => {
		try {
			if (page < 1) return;
			let response = await client.get('?_limit=10&page='+`${page}`);
			setPosts(response.data.notes);
			if(response.data.notes.length!==0) {
				setPage(page);
			} 
			
		} catch (error) {
			console.log(error);
		}
	};

	// DELETE with Axios
	const deletePost = async (id) => {
		try {
			await client.delete(`${id}`);
			setPosts(
				posts.filter((post) => {
					return post.id !== id;
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	// PATCH edit post
	const editPost = async (id) => {
		try {

			let response = await client.patch(`${id}`,{
				title: title,
				content: content
			});
			setPosts([response.data.note, ...posts.filter((post) => {
				return post.id !==	id;
			})])
			setTitle('');
			setBody('');
		} catch (error) {
			console.log(error);
		}
	}

	// handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		addPosts(title, content);
	};

	// POST with Axios
	const addPosts = async (title, content) => {
		try {
			let response = await client.post('', {
				title: title,
				content: content,
			});
			setPosts([response.data.note, ...posts]);
			setTitle('');
			setBody('');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="app">
			<nav>
				<h1>POSTS APP</h1>
			</nav>
			<div className="add-post-container">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="form-control"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						name=""
						className="form-control"
						id=""
						cols="10"
						rows="8"
						value={content}
						onChange={(e) => setBody(e.target.value)}
					></textarea>
					<button type="submit">Add Post</button>
				</form>
			</div>
			<div className="posts-container">
				<h2>All Posts</h2>
				{posts.map((post) => {
					return (
						<div className="post-card" key={post.id}>
							<h2 className="post-title">{post.title}</h2>
							<p className="post-body">{post.content}</p>
							<div className="button">
								<div className="update-btn" onClick={() => editPost(post.id)}>
									Update
								</div>
								<div className="delete-btn" onClick={() => deletePost(post.id)}>
									Delete
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div>
			<div className="button">
								<div className="previous-btn" onClick={() => getPage(page-1)}>
									Previous
								</div>
								<div className="next-btn" onClick={() => getPage(page+1)}>
									Next
								</div>
							</div>
			</div>
		</div>
	);
};

export default App;
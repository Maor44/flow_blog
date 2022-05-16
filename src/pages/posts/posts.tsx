import React from 'react';
import {Post} from "../../types";
import {api} from "../../services";
import {PostItem} from "../../components/post-item/post-item";
import {Loader} from "../../components/loader/loader";
import {Error} from "../../components/error/error";

const Posts = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [activePage, setActivePage] = React.useState(1);
    const [sortBy, setSortBy] = React.useState('');
    const [error, setError] = React.useState('');
    const lastPage = React.useRef(0);

    // fetch posts and users
    React.useEffect(() => {
        (async() => {
            try {
                const res = await api.get<Post[]>('/posts', {params: {
                        _embed: "comments",
                        _limit: 10,
                        _sort: sortBy,
                        // page always must be the last param here
                        _page: activePage,
                    }})


                const links = res.headers.link.split(',');
                lastPage.current = Number(links[links.length - 1].split('page=')[1].split('>')[0]);

                const data = await Promise.all(res.data.map(async post => {
                    const {data: user} = await api.get(`/users/${post.userId}`);
                    post.user = {...user}
                    return post;
                }))

                setPosts(data);
            }
            catch (e) {
                setError("Failed to fetch posts");
                setPosts([])
            }
        })()
    }, [activePage, sortBy])

    // turn off loading
    React.useEffect(() => {
        if(posts.length > 0){
            setLoading(false);
        }
    }, [posts])

    // edit post
    const handleEditPost = async(post: Post, filed: string, content: string | null) => {
        if(!content) {
            return;
        }

        switch (filed) {
            case 'title':
                post.title = content
                await api.put(`/posts/${post.id}`, {userId: post.userId, id: post.id, title: content, body: post.body})
                break;

            case 'username':
                setPosts(posts.map(p => {
                    if(p.userId === post.userId) {
                        p.user.username = content;
                    }
                    return p;
                }));
                await api.put(`users/${post.userId}`, post.user);
                break;

            case 'company':
                setPosts(posts.map(p => {
                    if(p.userId === post.userId) {
                        p.user.company.name = content;
                    }
                    return p;
                }));
                await api.put(`users/${post.userId}`, post.user)
                break;
            default:
                break;
        }
    };

    // delete post
    const handleDeletePost = async(post: Post) => {
        confirm('Are you sure?') && (await api.delete(`/posts/${post.id}`) && setPosts(posts.filter(p => p.id !== post.id)));
    };

    if(error) {
        return <Error error={error}/>
    }

    if(loading){
        return <Loader />
    }

    return (
        <>
            <select className="ml-6 mb-4 rounded px-2 py-2 w-40 bg-gray-200 cursor-pointer" onChange={(e) => setSortBy(e.target.value)}>
                <option value="">SortBy</option>
                <option value="id">id</option>
                <option value="title">Title</option>
            </select>
            <table className="table-auto w-full h-full">
                <thead>
                <tr className="h-20 text-white bg-gray-600">
                    <th className="px-4">Id</th>
                    <th className="px-4">Author</th>
                    <th className="px-4">Company</th>
                    <th className="px-4">Title</th>
                    <th className="px-4">Comments</th>
                    <th className="px-4"></th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post, index) => (
                    <tr className={`border-b-2 border-b-blue-200 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'}`} key={post.id}>
                        <PostItem post={post} handleEditPost={handleEditPost} handleDeletePost={handleDeletePost}/>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-center py-4">
                { Array.from({length:lastPage.current},(v,k)=>k+1).map(page => (
                    <button
                        key={page}
                        className={`${activePage === page ? 'bg-blue-500' : 'bg-blue-100'} px-4 py-2 rounded-full text-white mr-2`}
                        onClick={() => setActivePage(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </>

    );
};

export {Posts};
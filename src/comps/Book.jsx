import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';

const Book = () => {

    const [BookData, setBookData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const bookName = useRef()
    const bookTitle = useRef()
    const bookDesc = useRef()
    const bookPrice = useRef()

    const hendleSubmit = (e) => {
        e.preventDefault()
        let data = {
            bookName: bookName.current.value,
            bookTitle: bookTitle.current.value,
            bookDesc: bookDesc.current.value,
            bookPrice: bookPrice.current.value
        }

        axios.post("http://localhost:3000/posts", data).then((res) => {
            console.log(res.data)
            let postDatares = res.data
            setBookData([...BookData, postDatares])
        })


    }
    const getBook = () => {
        axios.get("http://localhost:3000/posts").then((res) => {
            setBookData(res.data)
        })
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBooks = BookData.filter(book => {
        return book.bookName.toLowerCase().includes(searchQuery.toLowerCase())
    });

    useEffect(() => {
        getBook()
    }, [])

    function alertfunc() {
        Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
        });
    }

    const deleteBook = (id, index) => {
        console.log(id);
        setBookData(BookData.filter((book, i) => i !== index));
        axios.delete(`http://localhost:3000/posts/${id}`).then((res) => {
            console.log(res.data);
        });
    };


    return (
        <div>
            <h1 className='text-5xl py-5 text-center'>Add Book</h1>
            <form class="max-w-sm mx-auto" onSubmit={hendleSubmit}>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">book Author</label>
                    <input type="text" ref={bookName} name='bookName' id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">book Title</label>
                    <input type="text" ref={bookTitle} name="bookTitle" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div><div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">book Description</label>
                    <input type="text" name="bookDesc" ref={bookDesc} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div><div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">book Price</label>
                    <input type="number" name="bookPrice" ref={bookPrice} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button onClick={alertfunc} data-swal-template="#my-template" type='submit' class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

            <div className='search-area flex justify-center items-center my-6'>
                <input type="text" value={searchQuery} onChange={handleSearchChange} name="serchBar" placeholder='Search Book' class="bg-gray-50 my-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className='container mx-auto py-5'>
                <div className='row flex flex-wrap mt-5'>
                    {
                        filteredBooks.map((val, ind) => {
                            return (


                                <div class="max-w-sm bg-white border m-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={ind}>
                                    <a href="#">
                                        <img class="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                                    </a>
                                    <div class="p-5">
                                        <a href="#">
                                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{val.bookName}</h5>
                                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{val.bookTitle}</h5>
                                        </a>
                                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{val.bookDesc}</p>
                                        <p class="mb-3 font-normal text-gray-700 font-semibold dark:text-gray-400">Price : {val.bookPrice}</p>
                                        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Read more
                                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </a>
                                        <button onClick={() => deleteBook(val.id, ind)} className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Deletet</button>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Book

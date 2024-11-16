import React from 'react'

const Home: React.FC = () => {
    return (
        <>
            <div className="content-container ">
                <h3 className='text-center alert alert-primary m-5 mx-auto font-monospace'>
                    Book Exchange Platform
                </h3>
                <h4 className="content-header font-monospace">
                    Book lovers frequently accumulate a collection of books they have read and look for other recommendations.
                    <br />
                    They are always eager to explore new reading material. Traditional methods of exchanging books, such as local
                    book swaps or lending among friends, are limited in scope and accessibility.
                    <br />
                    Therefore, it is imperative to have a digital platform that can facilitate book exchanges on a larger scale.
                    <br />
                    This platform should connect users with similar reading interests, enabling them to trade books easily and efficiently.
                    This project aims to develop a full-stack web application that serves as a centralized platform for users to exchange, lend,
                    and borrow books with other users. The platform should provide a user-friendly interface, robust search and recommendation features,
                    and secure transaction capabilities.
                </h4>
            </div>

        </>
    )
}

export default Home

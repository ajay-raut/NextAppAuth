
export default function UserProfile({ params }: any) {

    return (
        <div className="flex flex-col items-center 
        justify-center min-h-screen py-2">
            <h1>ProfilePage</h1>
            <hr />
            <p className="text-4xl">ProfilePage
                <span className="p-2 rounded bg-orange-600 
                text-black ml-2">{params.id}
                </span>
            </p>

        </div>
    )
}
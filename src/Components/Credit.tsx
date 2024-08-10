const Credits = () => {
    return (
        <div className="flex justify-center w-full items-center h-screen overflow-hidden bg-black/80 text-white">
            <div className="w-full max-w-3xl text-center">
                <h1 className="text-4xl font-bold mb-8">Coding Contest</h1>
                <h2 className="text-2xl mb-4">Developed By P. Muneeswaran,</h2>
                <p className="text-xl mb-2">Oragnised By R. Karthik Balan</p>
                <p className="text-xl mb-2">Technologies used:</p>
                <ul className="list-none">
                    <li className="mb-1">React(Vite)</li>
                    <li className="mb-1">Tailwind CSS</li>
                    <li className="mb-1">Firebase</li>
                    {/* Add more thanks as needed */}
                </ul>
            </div>
        </div>
    );
};

export default Credits;

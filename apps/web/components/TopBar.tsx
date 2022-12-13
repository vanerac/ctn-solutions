export default function TopBar() {
    // Topbar
    // Logo on the left side
    // Square avatar on the right side, clickable, and redirects to the profile page
    // Topbar should be responsive


    return (
        <div className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
            <div className="flex items-center">
                <img src="/logo.png" className="h-8 w-auto" alt="Workflow"/>
            </div>
            <div className="flex items-center">
                <button type="button"
                        className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
                    <img className="h-full w-full object-cover"
                         src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
                         alt="Your avatar"/>
                </button>
            </div>
        </div>

    );
}

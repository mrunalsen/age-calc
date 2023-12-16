const Header = () => {
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    };
    return (
        <div className="bg-rose-500 text-center mb-auto">
            <h2 className="text-white py-2">Age</h2>
            <button onClick={toggleTheme}>click</button>
        </div>
    );
};

export default Header;
import "flag-icons/css/flag-icons.min.css";

const Logos: React.FC = () => {
    return (
        <section id="logos" className="py-32 px-5 bg-background">
            <p className="text-xl font-medium text-center">Trusted by students worldwide.</p>
            <div className="mt-11 w-full flex flex-wrap flex-row items-center justify-evenly gap-5 sm:gap-10 logos-container opacity-70">
                {/* India */}
                <span className="fi fi-in text-6xl"></span>

                {/* South Africa */}
                <span className="fi fi-za text-6xl"></span>

                {/* USA */}
                <span className="fi fi-us text-6xl"></span>

                {/* Indonesia */}
                <span className="fi fi-id text-6xl"></span>

                {/* Australia */}
                <span className="fi fi-au text-6xl"></span>

                {/* Canada */}
                <span className="fi fi-ca text-6xl"></span>
            </div>
        </section>
    );
};

export default Logos;

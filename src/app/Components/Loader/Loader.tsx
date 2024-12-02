import "./Loader.scss";

export const Loader = () => {
    return (
        <div className="progress-overlay">
            <div className="bars6">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loader;
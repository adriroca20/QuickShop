import { Spinner } from "react-bootstrap";

export const Loader = () => {
    return (
<div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-10">
<Spinner animation="border" role="status" style={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}>
        <span className="visually-hidden">Loading...</span>
    </Spinner>
</div>
    )
}
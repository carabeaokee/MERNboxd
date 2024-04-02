import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/modal.scss";
import { FilmDetails } from "../pages/DetailsPage";

type ReviewModalProps = {
  show: boolean;
  handleClose: () => void;
  entry: FilmDetails;
  reviewText: string;
  setReviewText: (text: string) => void;
  handleReview: () => void;
};

function ReviewModal({
  show,
  handleClose,
  entry,
  reviewText,
  setReviewText,
  handleReview,
}: ReviewModalProps) {
  return (
    <>
      <Modal
        className="custom-modal"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {entry.title} ({entry.year})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            style={{ width: "100%", height: "100px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReview}>
            Save Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReviewModal;

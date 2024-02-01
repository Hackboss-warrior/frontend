import { FaSave } from "react-icons/fa";

const SaveEditPostButton = () => {
  const editPost = async () => {};
  return (
    <div className="saveEditBtnSection">
      <button className="saveEditBtn" onClick={() => editPost}>
        <FaSave />
      </button>
    </div>
  );
};

export default SaveEditPostButton;

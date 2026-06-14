import { useCalendarStore } from "../../hooks";

export const FabAddDelete = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();
  const handleClickDelete = () => startDeleteEvent();

  return (
    <>
      {hasEventSelected && (
        <button
          className="btn btn-danger fab-danger"
          onClick={handleClickDelete}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      )}
    </>
  );
};

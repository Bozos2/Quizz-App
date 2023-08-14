import React from "react";
import ReactDOM from "react-dom";
import Avatar from "react-avatar";

const Backdrop = (props) => {
  return (
    <div
      className="fixed inset-0 z-10 bg-black bg-opacity-75"
      onClick={props.onConfirm}
    />
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-20">
      <div className="flex flex-col justify-around bg-purple-700 border border-purple-500 rounded-2xl shadow-lg shadow-purple-500/40 outline-0 p-2">
        <h2 className="text-white p-2 font-bold">{props.title}</h2>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-3 p-2 mb-4">
            {props.avatars &&
              props.avatars.map((avatar, index) => (
                <div key={index} onClick={() => props.onClickHandler(avatar)}>
                  <Avatar
                    key={index}
                    src={avatar}
                    name={`Avatar ${index}`}
                    size="100"
                    round="120px"
                    style={
                      props.isClicked === avatar
                        ? { outline: "4px solid blue" }
                        : {}
                    }
                  />
                </div>
              ))}
          </div>
          <p className="text-white ">{props.messages}</p>
        </div>
        <div className="p-2 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
            onClick={props.onConfirm}
          >
            {props.buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          avatars={props.avatars}
          title={props.title}
          messages={props.messages}
          onConfirm={props.onConfirm}
          onClickHandler={props.onClickHandler}
          isClicked={props.isClicked}
          buttonTitle={props.buttonTitle}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default NotificationModal;

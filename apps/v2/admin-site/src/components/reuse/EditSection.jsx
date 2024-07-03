import React from "react";
import { Button, Divider } from "@nextui-org/react";

function EditSection(props) {
  return (
    <div className="w-full mb-16">
      {/* section header */}
      <div className="flex flex-row items-center justify-between">
        <p className="text-xl manrope-700">{props.sectionTitle}</p>
        {/* button section */}
        {props.hideButtonSection === true ? (
          props.customButton
        ) : (
          <div className="flex flex-row items-center gap-4">
            {props.editable[props.editableKey] ? (
              <>
                <Button
                  size="small"
                  onClick={() => {
                    props.setEditable((prevState) => {
                      return {
                        ...prevState,
                        [props.editableKey]: false,
                      };
                    });
                    props.handleSaveButton()
                  }}
                  className="font-bold text-white bg-gGreen"
                >
                  Save
                </Button>

                <Button
                  size="small"
                  onClick={() => {
                    props.handleCancelButton();
                  }}
                  className="font-bold text-white bg-danger"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                size="small"
                onClick={() =>
                  props.setEditable((prevState) => {
                    return {
                      ...prevState,
                      [props.editableKey]: true,
                    };
                  })
                }
                className="font-bold text-white bg-gGreen"
              >
                Edit
              </Button>
            )}
          </div>
        )}
      </div>
      {/* divider */}
      <Divider className="my-4" />
      {/* content */}
      {props.children}
    </div>
  );
}

export default EditSection;

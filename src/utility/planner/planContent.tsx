import { Step } from "../../model/Step";

export const planContent = (stepList: Array<Step>) => {
  return (
    <>
      {stepList?.map((step) => {
        <div>
          <li>{step.element.name}</li>
          <li>{step.element.description}</li>
        </div>;
      })}
    </>
  );
};

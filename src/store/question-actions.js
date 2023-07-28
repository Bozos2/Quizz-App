import { questionActions } from "./question-data";
import { uiActions } from "./ui-slice";
import { groupQuestions } from "./utils/groupQuestions";

export const fetchQuestionData = () => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setIsLoading(true));

      const fetchData = async () => {
        const response = await fetch(`${process.env.REACT_APP_QUESTIONS}`);

        if (!response.ok) {
          throw new Error("Could not fetch questions data");
        }

        const data = await response.json();

        return data;
      };

      const questionData = await fetchData();
      const groupedQuestions = groupQuestions(questionData, 10);

      dispatch(questionActions.addItemToArray(groupedQuestions));

      dispatch(uiActions.setIsLoading(false));
    } catch (error) {
      throw new Error("sorry");
    }
  };
};

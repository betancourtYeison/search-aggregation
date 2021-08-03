import { SearchType } from '../../entities';
import { StateType } from '../../frameworks';
import { SearchTypeInteractor } from '../../useCases';

type StateSliceType = SearchType;

type ActionType = {
  type: string;
  newType?: string;
};

const INITIAL_STATE = new SearchType('');
const SET_TYPE = 'searchType/setType';

/**
 * Function to select searchType from state
 *
 * @param {StateType} state
 * @returns {SearchType}
 */
export const searchTypeSelector = (state: StateType): SearchType => state.searchType;

/**
 * Function to call action and update type
 *
 * @param {string} newType
 * @returns {ActionType}
 */
export const setTypeAction = (newType: string): ActionType => ({
  type: SET_TYPE,
  newType,
});

/**
 * Function to mutate searchType
 *
 * @param {StateSliceType} searchType
 * @param {ActionType} action
 * @returns {StateSliceType}
 */
const setTypeReducer = (searchType: StateSliceType, action: ActionType): StateSliceType => {
  const interactor = new SearchTypeInteractor(searchType.type);
  interactor.updateType(action.newType);
  return new SearchType(interactor.searchType.type);
};

/**
 * Function to handle reducers
 *
 * @param {StateSliceType} [state=INITIAL_STATE]
 * @param {ActionType} action
 * @returns {StateSliceType}
 */
export const searchTypeReducer = (state: StateSliceType = INITIAL_STATE, action: ActionType): StateSliceType => {
  switch (action.type) {
    case SET_TYPE:
      return setTypeReducer(state, action);
    default:
      return state;
  }
};

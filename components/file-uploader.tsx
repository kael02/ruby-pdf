import { useReducer } from 'react';
import DropZone from '../components/dropZone';

const FileUploader = () => {
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'ADD_FILE':
        console.log('action', action);
        return { ...state, file: action.file };
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    file: null,
  });

  return <DropZone data={data} dispatch={dispatch} />;
};

export default FileUploader;

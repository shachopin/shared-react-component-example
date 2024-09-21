import React from "react";
//import ReactDOM from "react-dom";

const useMutationObserver = (
  ref,
  callback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) => {
  React.useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
  }, []);  //https://www.30secondsofcode.org/react/s/use-mutation-observer/ 
  //originally author says depedency array is [callback, options]
  //this is wrong
  //callback will always change after state change, options will change too
  //which makes the useEffect func always run, 
  //we should only run it once for observer
  //so [] is correct
  //then callback can be created once usig callback, check below incrementMutationCount
  //but then inside that callback function, state variable mutationCount becomes stale because func never created agai
  //therefore using ref and setState combo
};

export default useMutationObserver;

// const App = () => {
//   const mutationRef = React.useRef();
//   const [mutationCount, setMutationCount] = React.useState(0);
//   const latestValue = React.useRef(0)
//   const incrementMutationCount = React.useCallback(() => {
//     latestValue.current = latestValue.current + 1;
//     setMutationCount(latestValue.current);
//   }, []);
/* const incrementMutationCount = () => {  -- originall authos had this, I changed it
    return setMutationCount(mutationCount + 1);
  }; */
//   useMutationObserver(mutationRef, incrementMutationCount);
//   const [content, setContent] = React.useState('Hello world');

//   return (
//     <>
//       <label for="content-input">Edit this to update the text:</label>
//       <textarea
//         id="content-input"
//         style={{ width: '100%' }}
//         value={content}
//         onChange={e => setContent(e.target.value)}
//       />
//       <div
//         style={{ width: '100%' }}
//         ref={mutationRef}
//       >
//         <div
//           style={{
//             resize: 'both',
//             overflow: 'auto',
//             maxWidth: '100%',
//             border: '1px solid black',
//           }}
//         >
//           <h2>Resize or change the content:</h2>
//           <p>{content}</p>
//         </div>
//       </div>
//       <div>
//         <h3>Mutation count {mutationCount}</h3>
//       </div>
//     </>
//   );
// };

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <App />
// );
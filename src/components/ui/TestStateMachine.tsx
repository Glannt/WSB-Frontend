// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { PlusCircle, MinusCircle } from 'lucide-react';

// const initialStates = [
//   { id: 1, name: 'Available' },
//   { id: 2, name: 'Reserved' },
//   { id: 3, name: 'Confirmed' },
//   { id: 4, name: 'CheckedIn' },
//   { id: 5, name: 'InUse' }
// ];

// const initialTransitions = [
//   { id: 1, from: 'Available', to: 'Reserved', action: 'Customer makes reservation' },
//   { id: 2, from: 'Reserved', to: 'Confirmed', action: 'Customer confirms booking' },
//   { id: 3, from: 'Confirmed', to: 'CheckedIn', action: 'Customer checks in' },
//   { id: 4, from: 'CheckedIn', to: 'InUse', action: 'Customer starts using workspace' },
//   { id: 5, from: 'InUse', to: 'Available', action: 'Customer checks out' },
//   { id: 6, from: 'Reserved', to: 'Available', action: 'Reservation expires or is cancelled' },
//   { id: 7, from: 'Confirmed', to: 'Available', action: 'Booking is cancelled' },
//   { id: 8, from: 'CheckedIn', to: 'Available', action: 'Customer no-show, timeout' }
// ];

// const EditableStateMachine = () => {
//   const [states, setStates] = useState(initialStates);
//   const [transitions, setTransitions] = useState(initialTransitions);

//   const addState = () => {
//     const newId = Math.max(...states.map(s => s.id)) + 1;
//     setStates([...states, { id: newId, name: `New State ${newId}` }]);
//   };

//   const removeState = (id) => {
//     setStates(states.filter(s => s.id !== id));
//     setTransitions(transitions.filter(t => t.from !== states.find(s => s.id === id).name && t.to !== states.find(s => s.id === id).name));
//   };

//   const updateStateName = (id, newName) => {
//     setStates(states.map(s => s.id === id ? { ...s, name: newName } : s));
//     setTransitions(transitions.map(t => ({
//       ...t,
//       from: t.from === states.find(s => s.id === id).name ? newName : t.from,
//       to: t.to === states.find(s => s.id === id).name ? newName : t.to
//     })));
//   };

//   const addTransition = () => {
//     const newId = Math.max(...transitions.map(t => t.id)) + 1;
//     setTransitions([...transitions, { id: newId, from: states[0].name, to: states[0].name, action: 'New Action' }]);
//   };

//   const removeTransition = (id) => {
//     setTransitions(transitions.filter(t => t.id !== id));
//   };

//   const updateTransition = (id, field, value) => {
//     setTransitions(transitions.map(t => t.id === id ? { ...t, [field]: value } : t));
//   };

//   return (
//     <Card className="w-full max-w-4xl">
//       <CardHeader>
//         <h2 className="text-2xl font-bold">Editable State Machine</h2>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div>
//             <h3 className="text-xl font-semibold mb-2">States</h3>
//             {states.map(state => (
//               <div key={state.id} className="flex items-center space-x-2 mb-2">
//                 <Input
//                   value={state.name}
//                   onChange={(e) => updateStateName(state.id, e.target.value)}
//                   className="flex-grow"
//                 />
//                 <Button onClick={() => removeState(state.id)} variant="outline" size="icon">
//                   <MinusCircle className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//             <Button onClick={addState} variant="outline" className="mt-2">
//               <PlusCircle className="h-4 w-4 mr-2" /> Add State
//             </Button>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Transitions</h3>
//             {transitions.map(transition => (
//               <div key={transition.id} className="flex items-center space-x-2 mb-2">
//                 <select
//                   value={transition.from}
//                   onChange={(e) => updateTransition(transition.id, 'from', e.target.value)}
//                   className="border rounded p-2"
//                 >
//                   {states.map(state => (
//                     <option key={state.id} value={state.name}>{state.name}</option>
//                   ))}
//                 </select>
//                 <span>→</span>
//                 <select
//                   value={transition.to}
//                   onChange={(e) => updateTransition(transition.id, 'to', e.target.value)}
//                   className="border rounded p-2"
//                 >
//                   {states.map(state => (
//                     <option key={state.id} value={state.name}>{state.name}</option>
//                   ))}
//                 </select>
//                 <Input
//                   value={transition.action}
//                   onChange={(e) => updateTransition(transition.id, 'action', e.target.value)}
//                   className="flex-grow"
//                   placeholder="Action"
//                 />
//                 <Button onClick={() => removeTransition(transition.id)} variant="outline" size="icon">
//                   <MinusCircle className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//             <Button onClick={addTransition} variant="outline" className="mt-2">
//               <PlusCircle className="h-4 w-4 mr-2" /> Add Transition
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default EditableStateMachine;

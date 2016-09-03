import { Meteor } from 'meteor/meteor';


// Meteor.methods({
//   'postWidget'(doc){
//     const postWidgetUrl = 'http://spa.tglrw.com:4000/widgets';
//     const queryOptions = {
//       data : doc,
//       headers: {'Content-Type': 'application/json'}
//     };
//     // API issue when assigning <bool> false to melts. API returns --> '.melts required'
//     HTTP.post(postWidgetUrl, queryOptions, function(err, res){
//       if (err){
//         console.error(postWidgetUrl, ": Returned statusCode:", err.statusCode, err);
//         throw new Meteor.error('error posting to:', postWidgetUrl, err);
//       } else{
//         console.log('POST SUCCESSFUL:');
//         console.log('POST response:', res);
//       }
//     });
//   },
//
//   'putWidget'(doc){
//     let putWidgetsUrl = 'http://spa.tglrw.com:4000/widgets/' + doc.id;
//     const queryOptions = {
//       data : doc,
//       headers: {'Content-Type': 'application/json'}
//     };
//     HTTP.put(putWidgetsUrl, queryOptions, function(err, res){
//       if (err){
//         console.error(putWidgetsUrl, ": Returned statusCode:", err.statusCode, err);
//         throw new Meteor.error('Put error to:', putWidgetsUrl, err);
//       } else{
//         console.log('PUT SUCCESSFUL:');
//         console.log('PUT response:', res);
//       }
//     });
//   }
// });
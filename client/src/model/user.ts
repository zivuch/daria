export interface UserInterface {
    id: number, 
    email: string, 
    first_name: string,
    family_name: string,
    username: string
}

// export default class User implements UserInterface {
//     constructor(
//         private _id: number, 
//         private _email: string, 
//         private _first_name: string,
//         private _family_name: string,
//         private _username: string
//     ){}

//     get_id(): number {
//         return this._id;
//       }
    
//     set_id(id: number) {
//         this._id = id;
//       }
    
//     get_email(): string {
//         return this._email;
//       }
    
//     set_email(email: string) {
//         this._email = email;
//       }

//     get_first_name(): string {
//         return this._first_name;
//       }
    
//     set_first_name(first_name: string) {
//         this._first_name = first_name;
//       }

//     get_family_name(): string {
//         return this._family_name;
//       }

//     set_family_name(family_name: string) {
//         this._family_name = family_name;
//       }

//     get_username(): string {
//         return this._username;
//       }
    
//     set_username(username: string) {
//         this._username = username;
//       }

//     get_user_info():UserInterface {
//         return {
//             id: this._id,
//             email: this._email,
//             first_name: this._first_name,
//             family_name: this._family_name,
//             username: this._username
//         }
  
//     }
    
// }

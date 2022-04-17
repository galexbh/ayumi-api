export const moduleQueries = {
  getAllModule: `SELECT ModuleID, NameModules FROM Modules;`,
  addNewModule: `INSERT INTO Modules (NameModules) VALUES(@NameModules);`,
  deleteModule: `DELETE FROM Modules WHERE ModuleID=@Id;`,
  updateModule: `UPDATE Modules SET NameModules=@NameModules WHERE ModuleID=@Id;`,
};

export const emailQueries = {
  addNewEmail: `INSERT INTO Emails (Email) VALUES(@Email); SELECT SCOPE_IDENTITY() AS id;`,
};

export const rolQueries = {
    addNewRol: `INSERT INTO Roles (NameRoles) VALUES(@NameRoles);`,
  };

export const phoneNumberQueries = {
  addNewPhoneNumber: `INSERT INTO PhoneNumbers (PhoneNumber) VALUES(@PhoneNumber); SELECT SCOPE_IDENTITY() AS id;`,
};

export const userQueries = {
  getAllUser: `SELECT UserID, fk_rol, fk_phoneNumber, fk_email, FirsName, MiddleName, LastNamePaternal, LastNameMaternal, Age, Sex, RTN, PasswordUser, DateBirth, DateCreated FROM Users;  `,
  addNewUser: `INSERT INTO Users (fk_rol, fk_phoneNumber, fk_email, FirsName, MiddleName, LastNamePaternal, LastNameMaternal, Age, Sex, RTN, PasswordUser, DateBirth, DateCreated) VALUES(@fk_rol, @fk_phoneNumber, @fk_email, @FirsName, @MiddleName, @LastNamePaternal, @LastNameMaternal, @Age, @Sex, @RTN, @PasswordUser, @DateBirth, @DateCreated);`,
  deleteUser: `DELETE FROM Users WHERE UserID=@Id;`,
  updateUser: `UPDATE Users SET fk_phoneNumber=@fk_phoneNumber, fk_email=@fk_email, PasswordUser=@PasswordUser WHERE UserID=@UserID;`,
  updateUserRol: `UPDATE Users SET fk_rol=@fk_rol WHERE UserID=@UserID;`,
  getUserByEmail: `SELECT UserID, fk_rol, fk_phoneNumber, fk_email, FirsName, MiddleName, LastNamePaternal, LastNameMaternal, Age, Sex, RTN, PasswordUser, DateBirth, DateCreated FROM Users WHERE fk_email=(SELECT EmailID FROM Emails WHERE Email=@Email);`
};

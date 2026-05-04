# ☁️ Salesforce Cloud Practical

## Student Management System using Salesforce Developer Edition

---

## 📌 Aim

To design and develop a **Student Management System** using Salesforce Cloud by creating custom objects, fields, relationships, and a Lightning App.

---

## 🛠️ Requirements

* Laptop/Desktop with internet connection
* Salesforce Developer Edition account (free)
* Web browser (Chrome recommended)

---

## 🔰 Step 1: Create Salesforce Developer Account

1. Go to Salesforce Developer signup page
2. Fill required details:

   * First Name, Last Name
   * Email
   * Username (must be unique, email format)
3. Verify email and set password
4. Login to Salesforce

---

## 🔰 Step 2: Open Setup

1. Click on ⚙️ (Gear Icon) at top right
2. Click **Setup**

---

## 🔰 Step 3: Create Custom Object – Student

1. Go to **Object Manager**
2. Click **Create → Custom Object**
3. Enter details:

   * Label: Student
   * Plural Label: Students
   * Record Name: Student Name
   * Data Type: Text
4. Click **Save**

---

## 🔰 Step 4: Add Fields to Student Object

Go to **Fields & Relationships → New**

Add the following fields:

1. **Roll Number**

   * Data Type: Number

2. **Email**

   * Data Type: Email

3. **Branch**

   * Data Type: Picklist
   * Values: IT, CS, ENTC

4. **Year**

   * Data Type: Picklist
   * Values: FE, SE, TE, BE

---

## 🔰 Step 5: Create Custom Object – Course

1. Go to **Object Manager → Create → Custom Object**
2. Enter:

   * Label: Course
   * Record Name: Course Name
3. Click **Save**

### Add Fields:

* Course Code (Text)
* Credits (Number)

---

## 🔰 Step 6: Create Custom Object – Enrollment

1. Create new custom object:

   * Label: Enrollment

---

### Add Relationships:

1. **Student (Lookup Relationship)**

   * Related to: Student

2. **Course (Lookup Relationship)**

   * Related to: Course

---

## 🔗 Relationship Explanation

A **Many-to-Many relationship** exists between Student and Course.
This is handled using the Enrollment object.

```
Student ← Enrollment → Course
```

---

## 🔰 Step 7: Create Tabs

1. Go to Setup → Search **Tabs**
2. Under **Custom Object Tabs**, click **New**

Create tabs for:

* Student
* Course
* Enrollment

---

## 🔰 Step 8: Create Lightning App

1. Go to **App Manager**

2. Click **New Lightning App**

3. Enter App Name:

   * Student Management System

4. Add Navigation Items:

   * Student
   * Course
   * Enrollment

5. Save and finish

---

## 🔰 Step 9: Add Data (Records)

### Add Student:

* Name: Dipali
* Roll No: 101
* Email: [dipali@gmail.com](mailto:dipali@gmail.com)
* Branch: IT
* Year: SE

---

### Add Course:

* Course Name: DBMS
* Course Code: CS101
* Credits: 4

---

### Add Enrollment:

* Select Student: Dipali
* Select Course: DBMS

---

## ✅ Output

* Student records created
* Course records created
* Enrollment links students to courses
* Application UI visible with tabs

---

## 🎓 Viva Questions

**Q1. What is Salesforce?**
A cloud-based CRM platform used to build applications and manage data.

**Q2. What is an Object?**
A database table used to store data.

**Q3. What is a Field?**
A column in an object that stores specific data.

**Q4. What is a Lookup Relationship?**
A connection between two objects.

**Q5. Why Enrollment object is used?**
To handle many-to-many relationship between Student and Course.

---

## 🎯 Conclusion

A Student Management System was successfully developed using Salesforce by creating custom objects, fields, relationships, and a Lightning application.

---

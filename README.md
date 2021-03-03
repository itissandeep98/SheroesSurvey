<p align= "center">

<h1> SHEROES</h1>

<h2>Team #3</h2>

[Manavjeet Singh](https://github.com/underhood31), [Navneet Agarwal](https://github.com/navneet-ag), [Sandeep Kumar Singh](https://github.com/itissandeep98), [Sarthak Arora](https://github.com/sarthak144)

<h2>
Software Requirements Specification Document
</h2>

**Version:** (1.0) **Date:** (14/02/2021)

</p>

<p align="center">
  <img src="https://img.shields.io/github/issues-raw/SDOS-Winter2021/Team_3_Sheroes??style=plastic"> 
  <img src="https://img.shields.io/website?url=https://sdos-winter2021.github.io/Team_3_Sheroes/&style=plastic">
  <img src="https://img.shields.io/github/languages/count/SDOS-Winter2021/Team_3_Sheroes?style=plastic">
  <img src="https://img.shields.io/github/languages/code-size/SDOS-Winter2021/Team_3_Sheroes?style=plastic"> 
  <img src="https://img.shields.io/github/workflow/status/SDOS-Winter2021/Team_3_Sheroes/gh%20pages%20publish/master?style=plastic"> 
  <img src="https://img.shields.io/tokei/lines/github/SDOS-Winter2021/Team_3_Sheroes?style=plastic"> 
</p>

- [1. Introduction](#1-introduction)
  - [1.1 Purpose of this document](#11-purpose-of-this-document)
  - [1.2 Scope](#12-scope)
  - [1.3 References](#13-references)
  - [1.4 Initial Architecture](#14-initial-architecture)
  - [1.5 Overview](#15-overview)
- [2. Specific Requirements](#2-specific-requirements)
  - [2.1 External Interfaces](#21-external-interfaces)
  - [2.2 Functions](#22-functions)
    - [2.2.1 Feature Prioritization](#221-feature-prioritization)
  - [2.3 Performance Requirements](#23-performance-requirements)
  - [2.4 Design Constraints](#24-design-constraints)
- [3. Acceptance Criteria](#3-acceptance-criteria)
- [4. Summary of Meetings with Users/Sponsors](#4-summary-of-meetings-with-userssponsors)
  - [4.1 Meeting](#41-meeting)
  - [4.2 Meeting](#42-meeting)
  - [4.3 Meeting](#43-meeting)
  - [4.4 SRS Review Meetings](#44-srs-review-meetings)
  - [Briefly describe the method of review used:](#briefly-describe-the-method-of-review-used)
  - [List of critical issues identified in the review:](#list-of-critical-issues-identified-in-the-review)

## 1. Introduction

### 1.1 Purpose of this document

This document aims to present a detailed description of Sheroes user research platform for the Sheroes Organization. It will explain the system's purpose, features, and interfaces, what the system will do, and its operational constraints. This document is intended for the sponsors and developers of the system.

### 1.2 Scope

The main aim is to develop a new form platform for conducting surveys and online quizzes which the Sheroes organisation will use. This will be built using MySql, Django and React. It will be accessible with any standard compliant browser on your phone/computer.

### 1.3 References

● "9 Types of Design Constraint," published Jun '17 on Simplicable.
https://simplicable.com/new/design-constraints.

● "AcceptanceCriteria: Purposes, Formats, and best practices," published July'
on AltexSoft.
https://www.altexsoft.com/blog/business/acceptance-criteria-purposes-formats-an
d-best-practices/

● "How to elicit performance requirements," published Jan '21 on
SearchSoftwareQuality
https://searchsoftwarequality.techtarget.com/answer/How-to-elicit-performance-requirements

● "Index of /~chengb/RE-491/Papers." published Nov' 1 1
https://www.cse.msu.edu/~chengb/RE-491/Papers/~$SExample-webapp.doc
(accessed Feb. 07, 2021).

### 1.4 Initial Architecture

![image](https://user-images.githubusercontent.com/44255731/107886153-20849e00-6f24-11eb-8204-c32a65571aae.png)

### 1.5 Overview

The next section is the Specific Requirements which are written primarily for the developers. It describes all the interfaces, functionality, performance and design constraints. The thirds section is mainly for the sponsors to evaluate the developed system based on the parameters mentioned there.

## 2. Specific Requirements

### 2.1 External Interfaces

● Communication Interface

- End users will receive a form link with a unique identifier for every form.
- After filling up the form if requested by the user and enabled by the form creator, their responses will be mailed back.

● Software Interface

- Frontend: This is the primary interface with which every surveyee and form creator will interact. It will, in turn, interact with backend using APIs
- Backend: This will store and perform all the form functions by providing various API endpoints.

● Hardware Interface

- The application will be accessible from any device which has the browser support.

### 2.2 Functions

#### 2.2.1 Feature Prioritization

Following is the feature prioritisation.

**High Priority Features**

● The following type of questions should be included:

- MCQs
  - Variable number of options can be there.
  - This question may be single correct or multi correct.
  - Images can be given as options.
- Paragraph based questions
- Short answer questions.
- Form creators would be able to set the data type of input collection as a string(with character limit), float or integer.
- File Upload \
  Form creator will decide the following parameters:
  - Type of file (Image, pdf, txt etc.)
  - Size limit of file

● Individual link of the forms that can be shared to the end-users to fill them up.

● Questions can be marked compulsory by the creator.

● Form creator will have a toggle to disable accepting responses.

● Form creators can add images along with the question statement.

- Max two images will be allowed for every question.

● The accessibility to the form will be divided into three groups.

- Admin: Create and modify forms. Unrestricted access to the database.
- Editor: Create and modify forms. View the data of the form they created and export the inputs.
- End-User: Fill up the forms. Report an issue to Editor/Admin.

**Medium Priority**

● The form could be divided into multiple pages.

● Scheduling forms: Forms can be scheduled for a limited period.

● Additional input methods:

- Dropdowns

● Admin/Editor will have an option to append a consent page before the form.

● Ability to divide the form into sections.

- Each section could have a section header and section description field.

● The form could also be used to conduct graded quizzes. Quiz mode will have the following distinct features.

- Question sequence can be randomised for a particular section.

**Lower Priority**

● Addition quiz mode features:

- The creator will decide whether to display the score after finishing or release it later automatically.
- Answers could be revealed after the quiz.

● Additional input methods:

- Date-time picker
- The ranking is given options.
- Linkert

● Authentication and auto-filling details of pre-registered Sheroes' users.

● Captcha verification will be enabled to stop spamming.

● Email Notification using [SendGrid](https://sendgrid.com/)

- Notification for filling up the forms.
- Users can get their responses too on emails.

● In the quiz mode:

- All the question numbers will be displayed on the one side for easy navigation between questions.
- The attempted questions will be displayed in different colours from the unanswered questions.

### 2.3 Performance Requirements

● When hosted on sheroes servers, the platform should handle up to a million users simultaneously.

● The expected response time for submitting forms should be less than or equal to 2 seconds.

### 2.4 Design Constraints

● The number of simultaneous users support will be dependent upon the server on which the backend is installed.

● We are constrained to use MySQL database because the Sheroes platform already uses MySQL DB to store users' data.

● Any updates in an existing form by the form editor is visible to the end-user only after the page is refreshed.
To create a form, users must log in to the platform and have admin/editor rights.

● The existing colour palette and graphic identity of the Sheroes organisation will be maintained.

## 3. Acceptance Criteria

● The high and medium priority features will be implemented first within the project time frame.
● The testing of the platform will be done according to the functions which are mentioned in section 2.

## 4. Summary of Meetings with Users/Sponsors

### 4.1 Meeting

_Attendees:_

- Team: Manavjeet, Navneet, Sandeep, Sarthak
- Sponsors: Simar and Sunil.

_Date:_ 29-Jan-2021

_Duration:_ 35-40 mins

_Main points of discussion:_

● Everyone introduced themselves, and sponsors described the critical aspects of the project.

● The team was divided into two groups: Front-end and Back-end.

● Decisions regarding technology stack were made for both groups based on previous knowledge.

● Stakeholders of the end-product and their expected use-cases were discussed.

● Future mode and time of meetings were discussed. The team and sponsors decided upon meeting every Friday. The sponsors also assured that the team was free to reach them over email in case of any doubts.

● The next meeting's goal: The team had to present a document with their brainstorming about the project by the next meeting.

_Estimate of how much of the duration the sponsor/users spoke in the meeting:_ 15-20 mins

_Estimate of how much of the duration you/your team members spoke in the meeting:_
15-20 mins

### 4.2 Meeting

_Attendees:_

- Team: Manavjeet, Navneet, Sandeep, Sarthak
- Sponsors: Simar and Sunil.

_Date:_ 5-Feb-2021

_Duration:_ ~30 mins

_Main Points of discussion:_

● A brief discussion over the brainstorming document that was shared with them

● A basic idea about the Schema was discussed.

● The option of a consent page was introduced.

● The layout of questions was discussed.

● Option to report any discrepancy in the form should go to the admin.

● The app must be a standalone web platform for now.

● The goal for the next meeting:

The team had to present a document with

- Prioritisation of features
- Schema of the system
- Proposed UI

_Estimate of how much of the duration the sponsor/users spoke in the meeting:_ ~10 mins

_Estimate of how much of the duration you /your team members spoke in the meeting:_ ~20 mins

### 4.3 Meeting

_Attendees:_

- Team: Manavjeet, Navneet, Sandeep, Sarthak
- Sponsors: Simar and Sunil.

_Date:_ 12-Feb-2021

_Duration:_ 80-90 mins

_Main points of discussion:_

● The UI of the forms for quizzes and surveys and mobile/desktops was presented, and the discussion on the UI is mentioned below :

- Consent should be updated to a statement rather than a form.
- The banner option is to be added.
- Admin/Editor page is yet to be designed.
- Decisions on selection of a particular UI were taken in the meeting.
- Sponsor mentioned that they'd get their UX designer in contact with us.

● The Schema of the database was presented, and the discussion for the same is mentioned below:

- Try to add five mandatory columns in most of the tables.(Created on/ Updated on/Created by/Updated by/ IsActive/ IsDeleted)
- The naming convention should be changed. Like the primary key should be "id" for every table.
- No hard delete of data would be there. The IsDeleted attribute would handle soft deletion.
- Images paths will be stored as a string in the database.
- For every question, we will have an upper cap of two images.
- Options for MCQ depend on the editor, so we will have a separate options table to accommodate this.
- Dropdown as an input for the questions should be explored more and discussed in the next meeting.
- Details of the User table were discussed.

● The team discussed the GitHub repository for the project. The sponsors mentioned that the team should give them relevant access to add other people from Sheroes to this repo for any help needed in the future.

● The team to make the necessary changes to the UI and Schema and send them to sponsors by Tuesday.

_Estimate of how much of the duration the sponsor/users spoke in the meeting:_ ~40 mins

_Estimate of how much of the duration you/your team members spoke in the meeting:_ ~50 mins

### 4.4 SRS Review Meetings

_Attendees, Date and Duration:_ Meetings 2 and 3 were the review meetings

Size of the SRS being reviewed (in pages): 7

### Briefly describe the method of review used:

SRS was reviewed in a modular manner. The requirements document was shared with the sponsors before the second meeting to share their thoughts by commenting on the document. The doc was based upon the points mentioned in the previously shared problem statement by the sponsors.
In the second meeting, the team presented their understanding of the requirements using the pre-shared doc. The sponsors cleared any misunderstanding.
In the third meeting remaining doubts regarding the requirements were put forward from the team's side. The sponsors cleared them.

### List of critical issues identified in the review:

● Feature prioritisation was missing in the initial iteration. The basic functionality (like the creation of form, accepting responses etc.) features were given a higher priority. Other features which will act as accessories to the basic functionality (like email notifications ) were given lower priority.

● Architecture diagram of the platform was missing.

● Acceptance criteria and performance requirements needed updates. The initial draft had reiterated statements from the functions section.

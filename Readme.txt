This is the Repository for the QuMail Prototype which is to be showcased at the VESIT Internal Hackathon for SIH 2025.

Given Below is the Problem Statement:

Original Link: https://sih.gov.in/sih2025PS

Problem Statement ID 25179

Problem Statement Title	Quantum Secure Email Client Application

------xx------


Description	

Background
Email communication is a fundamental part of modern business and personal interactions. However, conventional encryption mechanisms are susceptible to various threats, including eavesdropping, man-in-the-middle attacks, and data breaches in post quantum era.

Quantum Key Distribution (QKD) offers an unprecedented level of security by distributing secure keys to two users over quantum channel and these keys can be used for encryption to achieve unconditional/enhanced security.

Detailed Description
The objective is to develop email client application like Microsoft Outlook (can be named as QuMail) which integrates Quantum Key Distribution (QKD) service with existing email protocols to enhance the security of email communication while maintaining compatibility with widely used email servers (Gmail, yahoo mail etc).

This application interfaces:
• With KM (Key Manager) for getting the quantum keys using ETSI Protocol and data format of REST-based key delivery APIs (ETSI GS QKD 014).
• With Email servers through standard protocols to utilize email service facility and.
• With users through GUI for capturing various user inputs.

Use case Scenario:
- Users (having quantum keys access through the KM and need not to implement QKD) need to exchange email with attachment over untrusted network (i.e. internet) and existing email service providers (Gmail, Yahoo mail etc).
- It is assumed that local key managers at both ends have already generated symmetrical quantum keys at their ends. The participants may simulate the KM (ref ETSI GS QKD 014) for testing & demonstrating the applications.

Expected Solution
Features:
Implemented solutions shall have good modularity to allow easy upgradation.
KM service and email service login feature.
Multi level of security configuration:
Level 1- Quantum Secure : use One Time Pad No Quantum security.
Level 2- Quantum-aided AES: use Quantum keys as seed for AES.
Level 3- Any other encryption (like PQC) may be given as option.
Level 4- No Quantum security.

Challenges:
Develop a robust mechanism to seamlessly integrate QKD and Quantum Network technology into existing email infrastructure. This includes using secure key which is distributed using QKD, in existing email communication for encryption while maintaining interoperability.

An approach to this problem can be: Encryption at application layer can be introduced in email client which will use QKD key.

Participant may consider keeping the application architecture in such a manner so that it may upgraded to Application Suit by integrating more applications like chat/audio/video calling for peer to peer communication.

Preferred OS: Windows

Note: The participants can make further assumptions regarding the problem. The features listed here are baseline and do not limit the scope of application development.

------xx------

Organization	Indian Space Research Organisation (ISRO)

Department	Department of Space(DoS)

Category	Software

Theme	Blockchain & Cybersecurity

-------------- End of Problem Statement ----------------


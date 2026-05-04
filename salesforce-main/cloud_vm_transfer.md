# Cloud Computing Practical

## Title
Transfer two text files between two virtual machines and display before and after results

## Aim
To transfer text files between two virtual machines using SCP and verify the transfer.

## Requirements
- Oracle VirtualBox  
- Ubuntu OS (2 Virtual Machines)  
- Internet connection  

## Procedure

### Part 1: VM Setup

1. Create two virtual machines (VM1 and VM2) using Ubuntu OS.

2. Configure network settings:
   - Settings → Network → Adapter 1
   - Host-only Adapter
   - VirtualBox Host-Only Ethernet Adapter

3. Start both VMs.

4. Check IP:
   ip a

Example:
VM1 → 192.168.56.101  
VM2 → 192.168.56.102  

### Part 2: Connection Test

ping 192.168.56.102

### Part 3: File Creation

nano file1.txt  
nano file2.txt  

cat file1.txt  
cat file2.txt  

### Part 4: SSH Setup

sudo apt update  
sudo apt install openssh-server -y  

passwd  

sudo nano /etc/ssh/sshd_config  

Add:
Subsystem sftp /usr/lib/openssh/sftp-server  

sudo systemctl restart ssh  

### Part 5: File Transfer

scp file1.txt ubuntu@192.168.56.102:/home/ubuntu/  
scp file2.txt ubuntu@192.168.56.102:/home/ubuntu/  

### Part 6: Verification

ls  
cat file1.txt  
cat file2.txt  

### Part 7: Modify File

nano file1.txt  

cat file1.txt  

## Output

Files transferred successfully between VMs.

## Viva

SCP: Secure Copy Protocol  
SSH: Secure Shell  

## Conclusion

Files transferred successfully using SCP over SSH.

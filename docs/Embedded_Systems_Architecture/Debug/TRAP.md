---
title: TRAP
parent: Debug
nav_order: 2
---

<h1>TRAP</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. Tổng quan

## 1.1. Trap System trên Tricore / AURIX (TC2xx, TC3xx)

Trap (đôi khi được gọi là exception) là một sự kiện đồng bộ (synchronous event) phát sinh từ phần mềm khi thực thi chương trình. Trong một số kiến trúc (như x86), trap khác fault ở chỗ return address trỏ đến instruction tiếp theo sau instruction gây trap (trong khi fault trỏ về chính instruction gây lỗi).

Đặc điểm chính:
- Được kích hoạt bởi các điều kiện như chia cho 0, breakpoint, hoặc truy cập bộ nhớ không hợp lệ (illegal access), on-Maskable Interrupt (NMI), instruction exception, memory management exception.
- Xảy ra đồng bộ với luồng thực thi của chương trình.
- Cần được xử lý, nhưng không dừng hoàn toàn việc thực thi code (khác với abort).
- Thường dùng cho các mục đích như quản lý bộ nhớ ảo (virtual memory management), debug chương trình,...
- Sau khi xử lý xong nguyên nhân, processor quay lại hoạt động trước đó.
- Trap luôn ở trạng thái active; chúng không thể bị disable bởi software.

Kiến trúc TriCore định nghĩa 8 general classes cho traps. Mỗi trap class có trap handler riêng. Trong mỗi class, các trap cụ thể được phân biệt bằng **Trap Identification Number (TIN)** và được hardware ghi vào **register D[15]** trước khi lệnh đầu tiên của trap handler được thực thi. Trap handler phải dựa vào giá trị trong register D[15] đến đến sub-handler của TIN cụ thể.

---

## 1.2. Các loại trap

Trap có thể được phân loại thêm thành synchronous hoặc asynchronous, và được generate bởi hardware hoặc software. 

- **Synchronous traps:** liên quan đến việc thực thi hoặc cố gắng thực thi các instruction cụ thể, hoặc cố gắng truy cập vào các virtual address cần sự can thiệp của memory-management system. Synchronous trap được trigger và service ngay lập tức.

- **Asynchronous traps:** liên quan đến hardware conditions nên tương tự như interrupts. Chúng được route qua trap vector. Một số asynchronous traps được trigger gián tiếp từ các instruction đã thực thi trước đó, nhưng mối liên hệ trực tiếp với instruction gây ra trap thì đã bị mất.

- **Hardware traps:** được generate khi hardware phát hiện exception conditions. Trong hầu hết trường hợp, exception conditions liên quan đến việc cố gắng thực thi một instruction cụ thể.

- **Software traps:** được generate một cách có chủ đích khi thực thi system call hoặc assertion instruction.

Ba tổ hợp khác nhau của trap types được hỗ trợ:
- Synchronous và hardware generated.
- Asynchronous và hardware generated.
- Synchronous và software generated.

---

## 1.3. Mô tả các trap

<table class="hover-table">
  <thead>
    <tr>
      <th>TIN</th>
      <th>Name</th>
      <th>Synch./Asynch.</th>
      <th>HW/SW</th>
      <th>Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="5"><strong>Class 0 - Memory management unit (MMU)</strong></td>
    </tr>
    <tr>
      <td>0</td>
      <td>VAF</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Virtual Address Fill</td>
    </tr>
    <tr>
      <td>1</td>
      <td>VAP</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Virtual Address Protection</td>
    </tr>
    <tr>
      <td colspan="5"><strong>Class 1 - Internal Protection Traps</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>PRIV</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Privileged Instruction</td>
    </tr>
    <tr>
      <td>2</td>
      <td>MPR</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Memory Protection Read</td>
    </tr>
    <tr>
      <td>3</td>
      <td>MPW</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Memory Protection Write</td>
    </tr>
    <tr>
      <td>4</td>
      <td>MPX</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Memory Protection Execute</td>
    </tr>
    <tr>
      <td>5</td>
      <td>MPP</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Memory Protection Peripheral Access</td>
    </tr>
    <tr>
      <td>6</td>
      <td>MPN</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Memory Protection Null Address</td>
    </tr>
    <tr>
      <td>7</td>
      <td>GRWP</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Global Register Write Protection</td>
    </tr>
    <tr>
      <td colspan="5"><strong>Class 2 - Instruction Errors</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>IOPC</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Illegal Opcode</td>
    </tr>
    <tr>
      <td>2</td>
      <td>UOPC</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Unimplemented Opcode</td>
    </tr>
    <tr>
      <td>3</td>
      <td>OPD</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Invalid Operand specification</td>
    </tr>
    <tr>
      <td>4</td>
      <td>ALN</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Data Address Alignment</td>
    </tr>
    <tr>
      <td>5</td>
      <td>MEM</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Invalid Local Memory Address</td>
    </tr>
    <tr>
      <td>6</td>
      <td>CSE</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Coprocessor Trap Synchronous Error</td>
    </tr>
    <tr>
      <td colspan="5"><strong>Class 3 - Context Management</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>FCD</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Free Context List Depletion (FCX = LCX)</td>
    </tr>
    <tr>
      <td>2</td>
      <td>CDO</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Call Depth Overflow (CALL with PSW.CDC.COUNT at maximum level)</td>
    </tr>
    <tr>
      <td>3</td>
      <td>CDU</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Call Depth Underflow (RET with PSW.CDC.COUNT == zero)</td>
    </tr>
    <tr>
      <td>4</td>
      <td>FCU</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Free Context List Underflow (FCX = 0)</td>
    </tr>
    <tr>
      <td>5</td>
      <td>CSU</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Call Stack Underflow (PCX = 0)</td>
    </tr>
    <tr>
      <td>6</td>
      <td>CTYP</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Context Type (PCXI.UL wrong)</td>
    </tr>
    <tr>
      <td>7</td>
      <td>NEST</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Nesting Error: RFE with non-zero call depth</td>
    </tr>
    <tr>
      <td colspan="5"><strong>Class 4 - System Bus and Peripheral Errors</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>PSE</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Program Fetch Synchronous Error</td>
    </tr>
    <tr>
      <td>2</td>
      <td>DSE</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Data Access Synchronous Error</td>
    </tr>
    <tr>
      <td>3</td>
      <td>DAE</td>
      <td>Asynch.</td>
      <td>HW</td>
      <td>Data Access Asynchronous Error</td>
    </tr>
    <tr>
      <td>4</td>
      <td>CAE</td>
      <td>Asynch.</td>
      <td>HW</td>
      <td>Coprocessor Trap Asynchronous Error</td>
    </tr>
    <tr>
      <td>5</td>
      <td>PIE</td>
      <td>Synch.</td>
      <td>HW</td>
      <td>Program Memory Integrity Error</td>
    </tr>
    <tr>
      <td>6</td>
      <td>DIE</td>
      <td>Asynch.</td>
      <td>HW</td>
      <td>Data Memory Integrity Error</td>
    </tr>
    <tr>
      <td>7</td>
      <td>TAE</td>
      <td>Asynch.</td>
      <td>HW</td>
      <td>Temporal Asynchronous Error</td>
    </tr>
    <tr>
      <td colspan="5"><strong>Class 5 - Assertion Traps</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>OVF</td>
      <td>Synch.</td>
      <td>SW</td>
      <td>Arithmetic Overflow</td>
    </tr>
    <tr>
      <td>2</td>
      <td>SOVF</td>
      <td>Synch.</td>
      <td>SW</td>
      <td>Sticky Arithmetic Overflow</td>
    </tr>
    <tr>
      <td colspan="5"><strong>Class 6 - System Call (SYS)</strong></td>
    </tr>
    <tr>
      <td>[0..255]</td>
      <td>SYS</td>
      <td>Synch.</td>
      <td>SW</td>
      <td>System Call</td>
    </tr>
    <tr>
      <td colspan="5"><strong>Class 7 - Non-Maskable Interrupt (NMI)</strong></td>
    </tr>
    <tr>
      <td>0</td>
      <td>NMI</td>
      <td>Asynch.</td>
      <td>HW</td>
      <td>Non-Maskable Interrupt</td>
    </tr>
  </tbody>
</table>



<!-- Cách tính địa chỉ handler:
```c
Entry address = BTV | (TCN << 5)
```
*(BTV thường align 256 byte; mỗi entry 32 byte)* -->


---


---

## 1.3. Mô tả trap

### 1.3.1. MPW - Memory Protection Write (Class 1, TIN 3)

MPW trap được generate khi memory protection system được enable và effective address của lệnh store, LDMST, SWAP hoặc ST.T không nằm trong bất kỳ range nào có write permissions enabled. Trap cũng được raise cho các lệnh CACHE (CACHEA.I/W/WI và CACHEI.I/W/WI) vì các lệnh này có thể modify nội dung của TAG memories.


---

### 1.3.2. MPX - Memory Protection Execute (Class 1, TIN 4)

MPX trap được raise khi program cố gắng thực thi instruction từ memory area không có execute permission và memory protection được enable. Trap thuộc Class-1 và có TIN 4.  

TC1.6.2P so sánh 64-bit aligned fetch group address với (các) range được định nghĩa bởi memory protection system để xác định execution có được phép hay không.

---

### 1.3.3. UOPC - Unimplemented Opcode (Class 2, TIN 2)

UOPC trap được raise trên optional MMU instructions, coprocessor 2 và coprocessor 3 instructions.

---

### 1.3.4. OPD - Invalid Operand (Class 2, TIN 3)

CPU raise OPD traps cho các instructions sử dụng even-odd register pairs làm operand khi operand specifier là odd.

---

### 1.3.5. DSE - Data Access Synchronous Error (Class 4, TIN 2)

Data Access Synchronous Bus Error (DSE) trap được generate bởi DMI module khi load access từ CPU gặp error conditions (ví dụ Bus error hoặc out-of-range access tới DSPR). Khi DSE trap được generate, nguyên nhân chính xác có thể xác định bằng cách đọc Data Synchronous Trap Register (DSTR). Chi tiết các error conditions và flag bits tương ứng trong DSTR xem Table “CPUx Data Synchronous Trap Register” on Page 90.

---

### 1.3.6. DAE - Data Access Asynchronous Error (Class 4, TIN 3)

Data Access Asynchronous Error Trap (DAE) được generate bởi DMI module khi store hoặc cache management access từ CPU gặp error conditions (ví dụ Bus error). Khi DAE trap được generate, nguyên nhân chính xác có thể xác định bằng cách đọc Data Asynchronous Trap Register (DATR). Chi tiết các error conditions và flag bits tương ứng trong DATR xem Table “CPUx Data Asynchronous Trap Register” on Page 91.

---

### 1.3.7. PIE - Program Memory Integrity Error (Class 4, TIN 5)

PIE trap được raise khi phát hiện uncorrectable memory integrity error trong instruction fetch từ local memory hoặc SRI bus. Trap này synchronous với erroneous instruction, thuộc Class-4 và có TIN 5.  

Program memories được bảo vệ khỏi memory integrity errors theo cơ sở 64-bit. Non-inhibited PIE trap được raise khi cố gắng thực thi instruction từ bất kỳ fetch group nào chứa memory integrity error. Có thể đọc PIEAR và PIETR registers để xác định nguồn lỗi chính xác hơn. PIE traps bị inhibit nếu PIETR.IED được set.

---

### 1.3.8. DIE - Data Memory Integrity Error (Class 4, TIN 6)

DIE trap được raise khi phát hiện uncorrectable memory integrity error trong data access tới local memory hoặc SRI bus. Trap thuộc Class-4 và có TIN 6.  

DIE traps luôn asynchronous, không phụ thuộc vào operation gặp lỗi.  
DIE trap được raise nếu bất kỳ memory half word (local memory) hoặc double word (SRI bus) được access bởi load/store operation chứa uncorrectable error và chưa có DIE trap nào khác được raise kể từ lần clear DIETR.IED bit. Có thể đọc DIEAR và DIETR registers để xác định nguồn lỗi chính xác hơn. Subsequent DIE traps bị inhibit nếu DIETR.IED được set.

---

# 2. Cách phản ứng với từng loại TRAP trên AURIX™ TC3XX MCU

Các phản ứng sau có thể áp dụng cho từng trap class, liên quan đến mức độ nghiêm trọng của system issue được phát hiện bởi exception. Phản ứng cuối cùng do user quyết định dựa trên application requirements của mình.

Khó đề xuất phản ứng chính xác cho mỗi exception (trap) vì phản ứng phụ thuộc vào hệ thống cụ thể và application requirements (ví dụ: safety requirements). User có thể phản ứng theo nhiều cách khác nhau. Ví dụ: trong một số trường hợp có thể trigger "*CPU/SoC/ system reset*"; trong trường hợp khác có thể "*enter safe state / indicate problem to the driver*",...

---

## 2.1. Class 0 - Memory management unit (MMU)

AURIX™ A2G không có memory management unit (MMU). MMU được đề cập trong TriCore™ architecture manual chỉ vì đây là optional feature của TriCore™ architecture. Do đó, MMU traps không được generate hoặc mong đợi trong normal operation. Nếu MMU trap xảy ra, rất có thể do hardware malfunctioning vì soft/hard failures. Phản ứng phù hợp do user quyết định khi biết soft/hard failure đang xảy ra.

---

## 2.2. Class 1 - Internal protection traps

Xảy ra privilege violation (vi phạm quyền hạn) khi program execution hoặc access Read/Write/Execution trên protected range area. Protected resources cần được bảo vệ khỏi truy cập không hợp lệ. SW reaction (thông qua trap handler) phụ thuộc vào application requirements (ví dụ: indicating problem to the driver, entering in safe state,...).

---

## 2.3. Class 2 - Instruction errors

Class này báo hiệu các loại instruction errors, bao gồm lỗi instruction opcode, instruction operand encodings, hoặc operand address (đối với memory accesses). TriCore™ architecture manual cung cấp một số gợi ý phản ứng cho từng loại trap (TIN) thuộc class này.

---

## 2.4. Class 3 - Context management

Với mỗi loại trap (TIN) thuộc class 3, TriCore™ manual đưa ra gợi ý triển khai SW handler. Ngoài ra, knowledge article "AURIX™ MCU: Reaction to Tricore™ trap Class 3" cũng hỗ trợ làm rõ một số phản ứng đề xuất.


TriCore định nghĩa 8 Trap Class; Class 3 có 7 trap, mỗi trap được nhận diện bằng Trap Identification Number (TIN) và yêu cầu phản ứng cụ thể khi xảy ra. Class 3 traps xác định các exception conditions mà context management subsystem phát hiện trong quá trình context save và restore liên quan đến function calls, interrupts, traps và returns instructions.

---

### 2.4.1. FCD - Free context list depletion (TIN 1)

FCD trap xảy ra khi context save operation làm cạn free context list bằng CSA cuối cùng được trỏ bởi context limit register (LCX). FCD trap handler cần thực hiện hành động phù hợp để khắc phục tình trạng depletion. Hành động phụ thuộc vào operating system (OS) và có thể bao gồm: cấp phát thêm memory cho CSA storage, terminate một hoặc nhiều tasks rồi trả CSAs của chúng về free list, hoặc copy call chains của inactive tasks sang external memory.
Nếu call chains được copy, OS task scheduler phải nhận biết và restore call chain của inactive task trước khi dispatch task đó. Asynchronous trap handlers có thể dùng FCDSF flag trong SYSCON register để nhận biết việc bị gián đoạn trong FCD trap handler.

---

### 2.4.2. CDO - Call depth overflow (TIN 2)

Trap này xảy ra khi chương trình thực thi lệnh CALL trong khi call depth counter được enable và giá trị call depth count (PSW.CDC.COUNT) đạt giá trị tối đa. Mục tiêu của CDO trap là phát hiện runaway recursion hoặc unnecessary call depth.
Loại handler có thể thay đổi theo use case:

- Trong giai đoạn software development: sizing CSA và gọi “information collection” function hỗ trợ debugging, đồng thời thử sizing CSA.

- Trong normal runtime: gọi “error function” để phát hiện improper execution.
Nếu không cần call depth, hãy disable nó và quản lý CSA động bằng các traps khác như FCD.

---

### 2.4.3. CDU - Call depth underflow (TIN 3)

Trap này xảy ra khi chương trình thực thi lệnh RET trong khi call depth counter được enable và giá trị call depth count (PSW.CDC.COUNT) bằng zero. Call depth underflow không chỉ ra software error trong task đang thực thi. OS có thể dùng narrow call depth counter, tăng hoặc giảm một software counter riêng cho task hiện tại mỗi khi xảy ra call depth overflow hoặc underflow trap. Program error được chỉ ra nếu software counter đã bằng zero khi CDU trap xảy ra.

---

### 2.4.4. FCU - Free context list underflow (TIN 4)

Trap này xảy ra khi context save hoặc restore thất bại do lost architectural state. Sự xuất hiện của FCU trap chỉ ra non-recoverable system error; FCU trap handler nên initiate system reset hoặc tránh để nó xảy ra. Để ngăn FCU trap, software được implement đúng phải trigger điều kiện FCD trước, cho phép software quản lý CSA. Để đạt được điều này, free context list phải chứa tối thiểu hai CSAs ngoài CSA được trỏ bởi LCX register. FCD handler sau đó có thể thực hiện context save và, nếu cần, một CALL.

---

### 2.4.5. CSU - Call stack underflow (TIN 5)

Trap này chỉ ra system software error (kernel hoặc OS) trong task setup hoặc context switching giữa các software-managed tasks. Nó cho thấy có nhiều lệnh RET hơn CALL hoặc nhiều lệnh RFE hơn actual exceptions. Phản ứng phụ thuộc vào software: nếu có đủ thông tin để recover (ví dụ CSA maintenance và task restart) thì lỗi không critical; nếu không thì khuyến nghị reset. Trong software đúng, trap này không xảy ra.

---

### 2.4.6. CTYP - Context type (TIN 6)

Trap này, giống CSU trap, chỉ ra system software error trong context list management. Nó xảy ra khi cố gắng context restore nhưng saved context không khớp với yêu cầu. Ví dụ: dùng lệnh RFE ở cuối exception handler mà chưa restore lower context (Exception → Save Lower Context (SVLCX) → … → No restore of lower context (No RSLCX) → RFE ⇒ CTYP). Phản ứng và cách tiếp cận khuyến nghị giống CSU trap vì đây là vấn đề trong software cần được sửa.

---

### 2.4.7. NEST - Nesting error (TIN 7)

Trap này xảy ra do incorrect software handling của lệnh RFE (return from exception). Việc return từ interrupt hoặc trap handler diễn ra bên trong body của handler hoặc trong code branched từ handler, thay vì trong code được call từ handler (ví dụ: Exception → CALL → … → NO RET, RFE ⇒ NEST). Trap này chỉ ra vấn đề cần được giải quyết bằng qualified software.

---

## 2.5. Class 4 - System bus and peripheral errors

Phản ứng phụ thuộc vào nguyên nhân lỗi khi truy cập qua bus tới system resources. Nguyên nhân lỗi có thể xác định qua các related registers như mô tả trong User manual. Phản ứng phù hợp cũng phụ thuộc vào application requirements (ví dụ: safety requirements).

---

## 2.6. Class 5 - Assertion traps

Các lệnh trap on overflow (TRAPV) và trap on sticky overflow (TRAPSV) gây trap nếu bit V (overflow) hoặc bit SV (sticky overflow) tương ứng được set. Các overflow bits có thể được clear bằng lệnh reset overflow bits (RSTV). Vì đây là SW instruction-oriented traps, không cần chỉ định phản ứng nào cho "expected" trap này. Tuy nhiên, nếu trap xảy ra khi không được mong đợi (ví dụ lệnh TRAPxV không được mong đợi thực thi), điều đó chỉ ra soft/hard failure. Phản ứng phù hợp do user quyết định khi biết soft/hard failure đang xảy ra (tương tự Class 0).

---

## 2.7. Class 6 - System call (SYS)

System call (SYS) trap được raise ngay sau khi thực thi lệnh SYSCALL để khởi tạo system call. Giá trị TIN được lấy từ hằng số tức thời (immediate constant, [0..255]) được chỉ định trong lệnh SYSCALL.

Đây cũng là SW instruction-oriented trap (giống Class 5), nên không cần chỉ định phản ứng cho "expected" trap này. Nếu trap xảy ra khi không thực sự được mong đợi (ví dụ lệnh SYSCALL không được mong đợi thực thi), điều đó chỉ ra soft/hard failure. Phản ứng phù hợp do user quyết định khi biết soft/hard failure đang xảy ra (như đã nêu ở Class 0).

---

## 2.8. Class 7 - Non-Maskable Interrupt (NMI)

Theo User manual, các nguyên nhân raise Non-Maskable Interrupt (NMI) phụ thuộc vào việc triển khai. Thông thường có external pin dùng để signal NMI, nhưng NMI cũng có thể được raise bởi watchdog timer interrupt, impending power failure, hoặc SMU alarm. Tham khảo User manual để hiểu phản ứng cho từng nguồn NMI khác nhau; đối với NMI trap raise bởi SMU alarm, phản ứng phù hợp phải tuân theo Safety user manual.

---

# 3. Trap handling

Khi trap xảy ra, hardware generate một trap identifier - gồm hai thành phần dùng để xác định thêm thông tin về trap và nguyên nhân:
- Trap Class Number (TCN)
- Trap Identification Number (TIN)

Trong hầu hết trường hợp, debugger sẽ dừng code execution bên trong một trong các trap handlers (được implement trong iLLD header `IfxCpu_Trap.c`). Một instance của structure `IfxCpu_Trap` được declare trong mỗi trap handler. Khi trap xảy ra, instance cung cấp 4 thông tin sau về trap:
- **tCpu**: CPU nào gây ra trap.
- **tClass**: Class của trap (TCN).
- **tId**: Id của trap (TIN).
- **tAddr**: Return Address (RA).

---

## 3.1. Trap vector format




---

## 3.2. Accessing the trap vector table


---

## 3.3. Return Address

**Return Address (RA)** có thể giúp xác định dòng code cụ thể gây ra trap. Return address được lưu trong instance của structure `IfxCpu_Trap`, đọc từ return address register A[11].

Tùy theo trap type, return address khác nhau:

- Với hầu hết **synchronous traps**, return address là 32-bit Program Counter (PC) của instruction gây trap (PC giữ địa chỉ của instruction đang chạy khi core bị halt). Với System Call (SYS) trap (trigger bởi lệnh SYSCALL), return address trỏ đến instruction ngay sau SYSCALL.

- **Free Context List Depletion (FCD)** trap được generate sau một context save operation làm free context list "almost empty". Nguyên nhân gây FCD trap có thể là hardware interrupt hoặc trap handler. Operation gây context save thường hoàn thành trước khi FCD trap được thực thi. Vì vậy, return address của FCD trap là instruction đầu tiên của trap/interrupt/called routine, hoặc instruction sau lệnh Save Lower Context (SVLCX) hoặc Begin Interrupt Service Routine (BISR).

- Với **asynchronous trap**, return address là địa chỉ của instruction sẽ được thực thi tiếp theo nếu asynchronous trap không bị trigger.

---

## 3.4. Thông tin debug bổ sung

1. Bit field `ERROR_ADDRESS` của **Data Error Address Register (DEADD)** chứa thông tin trap address cho data memory. Nội dung của DEADD register hợp lệ nếu **Data Synchronous Trap Register (DSTR)** hoặc **Data Asynchronous Trap Register (DATR)** khác 0 (tùy theo trap type). Các bit fields trong DSTR và DATR cung cấp thông tin bổ sung về trap. Thông tin này hợp lệ với các traps như:
  - Class 1, TIN 2 - Memory Protection Read (MPR).
  - Class 1, TIN 3 - Memory Protection Write (MPW).
  - Class 1, TIN 5 - Memory Protection Peripheral Access (MPP).
  - Class 1, TIN 6 - Memory Protection Null Address (MPN).
  - Class 2, TIN 4 - Data Address Alignment (ALN).
  - Class 2, TIN 5 - Invalid Local Memory Address (MEM).
  - Class 4, TIN 2 - Data Access Synchronous Error (DSE).
  - Class 4, TIN 3 - Data Access Asynchronous Error (DAE).

2. **Program Memory Interface Synchronous Trap Register (PSTR)** chứa thông tin synchronous trap cho program memory system. Register này được cập nhật với thông tin trap khi xảy ra **Program Fetch Synchronous Error traps (PSE)** (Class 4, TIN 1).

3. Nguyên nhân của **Program/Data Memory Integrity Error (PIE / DIE)** (Class 4, TIN 5/6) có thể được xác định chính xác bằng cách đọc các thanh ghi sau:
 - Program/Data Integrity Error Address Register (PIEAR / DIEAR)
 - Program/Data Integrity Error Trap Register (PIETR / DIETR)

---

# 4. Quy trình debug khi xảy ra Trap (AURIX)

1. Đặt breakpoint trên Trap Vector Table (toàn bộ bảng hoặc từng class phổ biến: Class 2 & 4).
- Lauterbach: menu “Break on trap entry (whole table)”.
- Kiểm tra BTV register.

2. Khi dừng tại vector:
- Đọc D[15] → TIN.
- Đọc A[11] → Return Address (để tìm lệnh gây lỗi).
- Xem cấu trúc IfxCpu_Trap (iLLD): tCpu, tClass, tId, tAddr.

3. Quan sát thêm:
- Call stack / disassembly.
- DEADD, DATR, DSTR (thêm vào Expressions window).
- Context (PCXI, FCX, LCX…) nếu liên quan Class 3.

4. Phản ứng khuyến nghị (tùy ứng dụng):
- Log thông tin → vào safe state / reset hệ thống.
- Class 3 FCU thường không recover được → nên reset.
- Class 4: kiểm tra ECC, vùng nhớ chưa init, peripheral chưa enable, OTP/protected sector…


Lưu ý thực tế:
- Compiler có thể chèn code vào khoảng trống của vector table → breakpoint phải chính xác.
- Multi-core: mỗi core có BTV riêng; cần xác định core nào gây trap.
- Debugger có thể cung cấp “active trap decoding”.

---






---

# Tham khảo

[1] [Infineon - Documents, "TRAP error recognition and reaction"](https://www.infineon.com/assets/row/public/documents/10/56/infineon-aurix-cpu-trap-recognition-1-kit-tc397-tft-training-en.pdf)

[2] [Infineon - Documents, "AURIX TC3xx Family User's Manual Part 1"](https://www.infineon.com/assets/row/public/documents/10/44/infineon-aurix-tc3xx-part1-usermanual-en.pdf)

[3] [Infineon - Community, "Understanding reactions for each trap class on AURIX™ TC3XX"](https://community.infineon.com/t5/Knowledge-Base-Articles/Understanding-reactions-for-each-trap-class-on-AURIX-TC3XX/ta-p/871222)

[4] [Infineon - Documents, "AURIX Training Debug Support"](https://www.infineon.com/assets/row/public/documents/10/56/infineon-aurix-debug-support-training-en.pdf)

[5] [Lauterbach, "TriCore™ Debugger & Trace"](https://www.lauterbach.com/supported-platforms/architectures/tricore)

[6] [Lauterbach - Help Center, "Case Study: Debugging Traps on TriCore™ AURIX™"](https://support.lauterbach.com/news/posts/case-study-debugging-traps-on-tricore-aurix)

[7] [TASKING, "Infineon TriCore: SCR Debugging"](https://kb.tasking.com/KB/85/Article/273)

[8] [Infineon - Community, "AURIX™ MCU: Reaction to Tricore™ trap Class 3"](https://community.infineon.com/t5/Knowledge-Base-Articles/AURIX-MCU-Reaction-to-Tricore-trap-Class-3/ta-p/449984)

[9] [Infineon - Community, "Application Trap Handling for AURIX™"](https://community.infineon.com/t5/Knowledge-Base-Articles/Application-Trap-Handling-for-AURIX/ta-p/760904)

[10] [Infineon - Documents, "TriCore™ TC1.8 architecture manual volume 1"](https://www.infineon.com/assets/row/public/documents/10/44/infineon-infineon-tricore-tc1.8-architecture-usermanual-en.pdf)

[11] [Microcontroller Tips, "Exceptions, traps, and interrupts, what’s the difference?"](https://www.microcontrollertips.com/exceptions-traps-and-interrupts-whats-the-difference-faq/)

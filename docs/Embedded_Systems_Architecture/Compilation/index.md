---
title: Compilation
parent: Embedded Systems Architecture
nav_order: 10
has_children: true
---

<h1>Compilation</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# Tổng quan

Quá trình biên dịch (Compilation) là quá trình compiler chuyển đổi từ mã nguồn (source code) sang mã đối tượng (object code) để phần cứng có thể hiểu và thực thi. Về tổng thể, luồng công việc này được chia thành hai giai đoạn lớn là biên dịch (compilation) và liên kết (linking), bao gồm 4 bước cụ thể như sau:
- Processing stage
- Compilation stage
- Assembly stage
- Linking stage


<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Compilation_Sequences.png"
  />
</figure>

----

# Preprocessing stage

<details markdown="block">
<summary><i>Key Concepts</i></summary>

> **1. Preprocessing Overview**
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Concept</th>
>       <th>Description</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><b>Preprocessing stage</b></td>
>       <td><b>Giai đoạn Tiền xử lý</b>: giai đoạn đầu tiên trong quá trình biên dịch, nơi trình tiền xử lý xử lý các chỉ thị tiền xử lý (ví dụ <code>#include</code>, <code>#define</code>, <code>#ifdef</code>) trước khi mã nguồn được chuyển sang trình biên dịch. Kết quả của giai đoạn này là file mã nguồn mở rộng.</td>
>     </tr>
>     <tr>
>       <td><b>Preprocessor</b></td>
>       <td><b>Trình tiền xử lý</b>: thành phần thực hiện giai đoạn tiền xử lý. Nó xử lý các chỉ thị tiền xử lý, mở rộng macro, chèn nội dung từ các file header, loại bỏ các phần mã không thỏa mãn điều kiện biên dịch và tạo ra file mã nguồn mở rộng.</td>
>     </tr>
>   </tbody>
> </table>
>
> **2. Input & Output**
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Concept</th>
>       <th>Description</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><b>Source file</b></td>
>       <td><b>File mã nguồn</b> (<code>.c</code>, <code>.cpp</code>, <code>.h</code>): các file chứa mã nguồn do lập trình viên viết bằng ngôn ngữ lập trình cấp cao. Các file <code>.c</code> và <code>.cpp</code> chứa mã thực thi, còn file <code>.h</code> thường chứa khai báo hàm, biến, kiểu dữ liệu và macro để chia sẻ giữa nhiều file mã nguồn.</td>
>     </tr>
>     <tr>
>       <td><b>Extended source file / Extended file</b></td>
>       <td><b>File mã nguồn mở rộng</b> (<code>.i</code>, <code>.ii</code>): kết quả sau khi trình tiền xử lý xử lý file mã nguồn. File này đã được mở rộng toàn bộ các file header, macro và các chỉ thị tiền xử lý khác, sẵn sàng để chuyển sang giai đoạn biên dịch. Thông thường <code>.i</code> dành cho C và <code>.ii</code> dành cho C++.</td>
>     </tr>
>     <tr>
>       <td><b>Translation Unit</b></td>
>       <td><b>Đơn vị biên dịch</b>: bao gồm file mã nguồn cùng toàn bộ nội dung được chèn từ #include, macro đã được mở rộng và các chỉ thị tiền xử lý đã được xử lý. Translation unit thường được biểu diễn dưới dạng một extended source file (<code>.i</code> hoặc <code>.ii</code>), mặc dù compiler không nhất thiết phải tạo file này.</td>
>     </tr>
>   </tbody>
> </table>
>
> **3. Programming Languages**
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Concept</th>
>       <th>Description</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><b>High-level language (HLL)</b></td>
>       <td><b>Ngôn ngữ cấp cao</b>: ngôn ngữ lập trình gần với ngôn ngữ của con người, giúp lập trình viên dễ đọc, dễ viết và dễ bảo trì. Ví dụ: C, C++, Java, Python. Chương trình viết bằng ngôn ngữ cấp cao phải được biên dịch hoặc thông dịch thành mã máy trước khi CPU, MCU có thể thực thi.</td>
>     </tr>
>     <tr>
>       <td><b>Machine-level language</b></td>
>       <td><b>Ngôn ngữ cấp máy</b>: ngôn ngữ mà CPU, MCU có thể thực thi trực tiếp, bao gồm các chuỗi các giá trị nhị phân (0 và 1) để biểu diễn lệnh máy. Đây là mức ngôn ngữ thấp nhất và phụ thuộc vào kiến trúc của từng bộ xử lý.</td>
>     </tr>
>     <tr>
>       <td><b>Absolute machine code</b></td>
>       <td><b>Mã máy tuyệt đối</b>: mã máy mà tất cả các địa chỉ bộ nhớ đã được xác định tuyệt đối. Chương trình có thể được nạp và thực thi trực tiếp tại đúng địa chỉ đã chỉ định mà không cần quá trình định vị lại (relocation).</td>
>     </tr>
>   </tbody>
> </table>
>
> **4. Preprocessor Behavior**
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Concept</th>
>       <th>Description</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><b>Preprocessor directive / Preprocessor command</b></td>
>       <td><b>Chỉ thị tiền xử lý</b>: các lệnh bắt đầu bằng ký tự <code>#</code>, được xử lý bởi trình tiền xử lý trước khi biên dịch. Ví dụ: <code>#define</code>, <code>#include</code>, <code>#ifdef</code>, <code>#ifndef</code>, <code>#if</code>, <code>#elif</code>, <code>#else</code>, <code>#endif</code>, <code>#pragma</code>. Chúng được dùng để định nghĩa macro, chèn file header, biên dịch có điều kiện và điều khiển quá trình tiền xử lý.</td>
>     </tr>
>     <tr>
>       <td><b>Program block</b></td>
>       <td><b>Khối chương trình / Khối lệnh</b>: một nhóm các câu lệnh được đặt trong cùng một phạm vi thực thi, thường được bao bởi cặp dấu ngoặc nhọn <code>{}</code> trong C/C++. Các biến được khai báo bên trong khối thường chỉ có hiệu lực trong phạm vi của khối đó.</td>
>     </tr>
>     <tr>
>       <td><b>Scoping rules</b></td>
>       <td>
>         <b>Quy tắc về phạm vi</b>: các quy tắc xác định nơi một biến hoặc đối tượng được công nhận và có thể truy cập trong mã nguồn (lập trình), hoặc các tiêu chuẩn hiển thị dữ liệu cho người dùng (trong hệ thống phần mềm).
>         <ul>
>           <li><b>Local Scope (Phạm vi Cục bộ):</b> biến chỉ được truy cập bên trong hàm hoặc khối lệnh khởi tạo nó. Sau khi hàm hoặc khối lệnh đó kết thúc, biến sẽ bị hủy.</li>
>           <li><b>Global Scope (Phạm vi Toàn cục):</b> biến được khai báo bên ngoài tất cả các hàm và có thể được truy cập ở bất kỳ đâu trong toàn bộ file mã nguồn (hoặc nhiều file nếu được khai báo phù hợp).</li>
>         </ul>
>       </td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

Giai đoạn Tiền xử lý (Preprocessing stage) là bước đầu tiên và đóng vai trò nền tảng trong toàn bộ quá trình biên dịch. Tại giai đoạn này, trình tiền xử lý (preprocessor) tiếp nhận các file mã nguồn (source files, như `.c`, `.cpp` và `.h`) để tạo ra các file mã nguồn mở rộng (extended source files hay extended files, thường có định dạng là `.i` hoặc `.ii`, còn được gọi là translation unit).

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Preprocessing_stage.png"
  />
</figure>

Preprocessor là một phần mềm hệ thống (system software) thực hiện việc tiền xử lý ngôn ngữ cấp cao (high-level language - HLL), tức chuyển đổi ngôn ngữ cấp cao thành ngôn ngữ cấp máy (machine-level languages) hoặc mã máy tuyệt đối (absolute machine codes) (ngôn ngữ mà máy có thể hiểu được).

Ngôn ngữ của preprocessor chủ yếu thao tác dựa trên việc thay thế văn bản. Preprocessor không quan tâm đến các quy tắc về phạm vi (scoping rules) hay cấu trúc của các khối chương trình (program blocks); các chỉ thị tiền xử lý (preprocessor directives hoặc preprocessor commands, như `#define`) sẽ có hiệu lực ngay khi xuất hiện và tiếp tục tồn tại cho đến hết file (trừ khi gặp `#undef`).

Dưới đây là các tác vụ chi tiết được thực hiện trong giai đoạn Preprocessing:

1. **Tiền xử lý ban đầu (Initial preprocessing):** 
    
    - **Joining continued lines (Nối các dòng mã):** Preprocessor sẽ tiến hành nối các dòng mã được ngắt xuống dòng bằng dấu gạch chéo ngược `\`.
    
    - **Stripping/Removing comments (Xóa bỏ chú thích):** Toàn bộ các đoạn comment trong mã nguồn sẽ bị loại bỏ vì máy tính không cần đến chúng để thực thi chương trình.

    - **Whitespace removal (Loại bỏ khoảng trống):** Các ngôn ngữ lập trình bỏ qua khoảng trắng nên preprocessor sẽ loại bỏ tất cả khoảng trắng.

2. **File Inclusion (Xử lý chỉ thị `#include`):**
    Preprocessor sẽ phân giải các chỉ thị `#include` bằng cách sao chép toàn bộ nội dung của các file thư viện (header, ví dụ: `.h`) và dán trực tiếp vào vị trí gọi chỉ thị `#include`. 
    
    - Nếu tên file nằm trong dấu ngoặc nhọn (ví dụ: `<stdio.h>`), compiler sẽ tìm kiếm trong các đường dẫn thư viện chuẩn.
    
    - Nếu tên file nằm trong dấu ngoặc kép (ví dụ: `"stdio.h"`), nó sẽ ưu tiên tìm kiếm trong thư mục chứa mã nguồn hiện tại trước.

3. **Mở rộng và thay thế Macro (Macro Expansion):**
    Các chỉ thị bắt đầu bằng `#define` sẽ được phân giải và thay thế trên toàn bộ mã nguồn. Có hai loại macro chính:
    
    - **Macro Constant:** Định nghĩa một cái tên thay thế cho một giá trị cố định (ví dụ: thay thế tên `PI_VALUE` bằng giá trị `3.1416`), giúp người lập trình dễ dàng thay đổi giá trị này ở một nơi duy nhất thay vì phải tìm sửa toàn bộ chương trình.
      ```c
      #define PI_VALUE 3.1416
      ```
    
    - **Function Like-Macro:** Thay thế các đoạn code nhận tham số giống như một hàm thực thụ.
      ```c
      #define CIRCLE_AREA(r) (3.1416 * (r) * (r))
      ```
    Việc sử dụng macro dạng hàm giúp tăng tốc độ thực thi vì tránh được độ trễ của việc gọi hàm (function call). Tuy nhiên, nhược điểm là nếu dùng quá nhiều sẽ làm tăng dung lượng mã nguồn (code size) và các tham số truyền vào macro không được kiểm tra lỗi kiểu dữ liệu. Ngoài ra, các tham số (parameters) của Function Like-Macro sẽ không được kiểm tra lỗi trong quá trình compile; chúng cũng không có kiểu dữ liệu nên việc sử dụng biến đếm là không khả thi.

4. **Biên dịch có điều kiện (Conditional Compilation):**
    Preprocessor đánh giá các chỉ thị như `#ifdef`, `#ifndef`, `#if`, `#elif`, `#else` và `#endif` để quyết định xem một đoạn code nhất định có được đưa vào file kết quả để biên dịch hay không. 
    
    - Kỹ thuật này cực kỳ hữu ích để code tương thích với nhiều loại vi điều khiển, hệ điều hành khác nhau trên cùng một file mã nguồn.
    
    - Đặc biệt, nó thường được sử dụng làm **Include guard** (ví dụ: kết hợp `#ifndef` và `#define`) ở các file header để tránh lỗi include lặp lại một thư viện nhiều lần.
      ```c
      #ifndef MY_HEADER_H
      #define MY_HEADER_H

      // Nội dung file header

      #endif
      ```

Kết quả của giai đoạn Preprocessing là các file mã nguồn mở rộng, trong đó:
- Toàn bộ comment đã được xóa.
- Tất cả các chỉ thị `#include` đã được thay thế bằng nội dung thực tế của các file được include.
- Các macro đã được mở rộng.
- Các khối mã điều kiện không thỏa mãn đã bị loại bỏ.
- Không còn các chỉ thị tiền xử lý (`#include`, `#define`, `#ifdef`, ...) chưa được xử lý.

---

# Compilation stage

<details markdown="block">
<summary><i>Key Concepts</i></summary>

> **1. Compilation Overview**
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Concept</th>
>       <th>Description</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><b>Compilation stage</b></td>
>       <td>Giai đoạn Biên dịch: chuyển đổi file mã nguồn mở rộng thành mã Assembly hoặc mã máy.</td>
>     </tr>
>     <tr>
>       <td><b>Compiler</b></td>
>       <td>Trình biên dịch: chuyển đổi mã nguồn thành mã đích thông qua nhiều giai đoạn xử lý.</td>
>     </tr>
>     <tr>
>       <td><b>Compiler vendor</b></td>
>       <td>Nhà cung cấp compiler: phát triển và duy trì trình biên dịch.</td>
>     </tr>
>     <tr>
>       <td><b>Target processor</b></td>
>       <td>Bộ xử lý đích: kiến trúc phần cứng mà mã chương trình được tạo ra để thực thi.</td>
>     </tr>
>     <tr>
>       <td><b>Cross Compiler</b></td>
>       <td>Trình biên dịch chéo: tạo mã thực thi cho một nền tảng khác với nền tảng đang chạy compiler.</td>
>     </tr>
>   </tbody>
> </table>
>
> **2. Front-end Processing**
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Concept</th>
>       <th>Description</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><b>Parser</b></td>
>       <td>Trình phân tích cú pháp: kiểm tra cú pháp và xây dựng cấu trúc chương trình từ các token.</td>
>     </tr>
>     <tr>
>       <td><b>Token</b></td>
>       <td>Thẻ (đơn vị từ vựng): đơn vị nhỏ nhất được parser xử lý.</td>
>     </tr>
>     <tr>
>       <td><b>Parse Tree</b></td>
>       <td>Cây phân tích cú pháp: biểu diễn cấu trúc cú pháp của chương trình.</td>
>     </tr>
>     <tr>
>       <td><b>Abstract Syntax Tree (AST)</b></td>
>       <td>Cây cú pháp trừu tượng (AST): biểu diễn cú pháp đã lược bỏ các chi tiết không cần thiết.</td>
>     </tr>
>     <tr>
>       <td><b>Intermediate Representation (IR)</b></td>
>       <td>Biểu diễn trung gian (IR): dạng mã trung gian độc lập với phần cứng.</td>
>     </tr>
>     <tr>
>       <td><b>Pseudo-code</b></td>
>       <td>Mã giả: dạng biểu diễn thuật toán gần với ngôn ngữ tự nhiên.</td>
>     </tr>
>     <tr>
>       <td><b>GIMPLE</b></td>
>       <td>GIMPLE: một dạng IR được GCC sử dụng.</td>
>     </tr>
>     <tr>
>       <td><b>Semantic Analysis</b></td>
>       <td>Phân tích ngữ nghĩa: kiểm tra tính hợp lệ về mặt logic của chương trình.</td>
>     </tr>
>     <tr>
>       <td><b>Symbol Table</b></td>
>       <td>Bảng ký hiệu: lưu trữ thông tin về các định danh trong chương trình.</td>
>     </tr>
>     <tr>
>       <td><b>Debug Information</b></td>
>       <td>Thông tin gỡ lỗi: hỗ trợ công cụ debugger ánh xạ mã máy về mã nguồn.</td>
>     </tr>
>   </tbody>
> </table>
>
> **3. Optimization &amp; Code Generation**
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Concept</th>
>       <th>Description</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><b>Loop Optimization</b></td>
>       <td>Tối ưu vòng lặp: cải thiện hiệu năng hoặc giảm kích thước mã của vòng lặp.</td>
>     </tr>
>     <tr>
>       <td><b>Inline Function</b></td>
>       <td>Hàm nội tuyến: thay thế lời gọi hàm bằng thân hàm để giảm chi phí gọi hàm.</td>
>     </tr>
>     <tr>
>       <td><b>Code Generator</b></td>
>       <td>Bộ tạo mã: chuyển đổi IR thành mã đích tương ứng với bộ xử lý.</td>
>     </tr>
>     <tr>
>       <td><b>Assembly language</b></td>
>       <td>Ngôn ngữ hợp ngữ: ngôn ngữ cấp thấp biểu diễn trực tiếp các lệnh của bộ xử lý.</td>
>     </tr>
>     <tr>
>       <td><b>Assembly instruction (Assembly mnemonic)</b></td>
>       <td>Lệnh hợp ngữ: biểu diễn dạng ký hiệu của một lệnh máy.</td>
>     </tr>
>     <tr>
>       <td><b>Opcode</b></td>
>       <td>Mã lệnh máy: phần xác định thao tác cần thực hiện của một lệnh máy.</td>
>     </tr>
>     <tr>
>       <td><b>Machine Code</b></td>
>       <td>Mã máy: tập hợp các lệnh nhị phân có thể được CPU thực thi trực tiếp.</td>
>     </tr>
>   </tbody>
> </table>
>
> **4. Memory Layout**
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Concept</th>
>       <th>Description</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><b>Memory Allocation</b></td>
>       <td>Phân bổ bộ nhớ: xác định vị trí lưu trữ mã lệnh và dữ liệu.</td>
>     </tr>
>     <tr>
>       <td><b>Memory Section</b></td>
>       <td>Phân vùng bộ nhớ: vùng chứa các loại mã hoặc dữ liệu có cùng đặc tính.</td>
>     </tr>
>     <tr>
>       <td><b>.text section</b></td>
>       <td>Phân vùng chứa mã lệnh: lưu mã thực thi của chương trình.</td>
>     </tr>
>     <tr>
>       <td><b>.code section</b></td>
>       <td>Phân vùng chứa mã lệnh: tên gọi khác của <code>.text</code> trong một số toolchain.</td>
>     </tr>
>     <tr>
>       <td><b>Static Data</b></td>
>       <td>Dữ liệu tĩnh: dữ liệu tồn tại trong toàn bộ thời gian chạy chương trình.</td>
>     </tr>
>     <tr>
>       <td><b>.data section</b></td>
>       <td>Phân vùng dữ liệu đã khởi tạo: lưu các biến tĩnh đã được khởi tạo.</td>
>     </tr>
>     <tr>
>       <td><b>.bss section</b></td>
>       <td>Phân vùng dữ liệu chưa khởi tạo: lưu các biến tĩnh chưa được khởi tạo.</td>
>     </tr>
>     <tr>
>       <td><b>Constant Object</b></td>
>       <td>Đối tượng hằng: đối tượng có giá trị không thay đổi sau khi khởi tạo.</td>
>     </tr>
>     <tr>
>       <td><b>.rodata section</b></td>
>       <td>Phân vùng dữ liệu chỉ đọc: lưu các hằng số chỉ đọc.</td>
>     </tr>
>     <tr>
>       <td><b>.const section</b></td>
>       <td>Phân vùng hằng số: vùng dành riêng cho các hằng số trong một số toolchain.</td>
>     </tr>
>     <tr>
>       <td><b>Automatic Variable</b></td>
>       <td>Biến tự động: được cấp phát khi vào hàm và giải phóng khi ra khỏi hàm.</td>
>     </tr>
>     <tr>
>       <td><b>Temporary Returned Object (TRO)</b></td>
>       <td>Đối tượng tạm thời được trả về (TRO): đối tượng tạm sinh ra khi trả về giá trị từ hàm.</td>
>     </tr>
>     <tr>
>       <td><b>Stack</b></td>
>       <td>Ngăn xếp: vùng nhớ quản lý lời gọi hàm và biến tự động.</td>
>     </tr>
>     <tr>
>       <td><b>Stack Pointer (SP)</b></td>
>       <td>Con trỏ ngăn xếp (SP): thanh ghi trỏ đến đỉnh của stack.</td>
>     </tr>
>     <tr>
>       <td><b>Register</b></td>
>       <td>Thanh ghi: vùng nhớ tốc độ cao nằm bên trong CPU.</td>
>     </tr>
>     <tr>
>       <td><b>Dynamic Data</b></td>
>       <td>Dữ liệu động: dữ liệu được cấp phát trong thời gian chạy.</td>
>     </tr>
>     <tr>
>       <td><b>Dynamic Object</b></td>
>       <td>Đối tượng động: đối tượng được cấp phát trên heap.</td>
>     </tr>
>     <tr>
>       <td><b>Heap</b></td>
>       <td>Vùng nhớ Heap: vùng cấp phát bộ nhớ động trong thời gian chạy.</td>
>     </tr>
>   </tbody>
> </table>
>
> **5. Toolchain &amp; Output**
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Concept</th>
>       <th>Description</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td><b>Assembler</b></td>
>       <td>Trình hợp ngữ: chuyển đổi mã Assembly thành mã máy.</td>
>     </tr>
>     <tr>
>       <td><b>Integrated Assembler</b></td>
>       <td>Trình hợp ngữ tích hợp: assembler được tích hợp bên trong compiler.</td>
>     </tr>
>     <tr>
>       <td><b>Linker</b></td>
>       <td>Trình liên kết: kết hợp các file đối tượng và thư viện thành chương trình hoàn chỉnh.</td>
>     </tr>
>     <tr>
>       <td><b>Assembly source file</b></td>
>       <td>File mã Assembly: lưu mã hợp ngữ, thường có phần mở rộng <code>.s</code> hoặc <code>.asm</code>.</td>
>     </tr>
>     <tr>
>       <td><b>Object File</b></td>
>       <td>File đối tượng: lưu mã máy chưa liên kết, thường có phần mở rộng <code>.o</code> hoặc <code>.obj</code>.</td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }

</details>


Giai đoạn Biên dịch (Compilation stage) là quá trình compiler chuyển đổi các file mã nguồn mở rộng đã được xử lý thành các lệnh hợp ngữ (assembly code / commands / mnemonics) được lưu trong các file mã Assembly (thường có định dạng `.s` hoặc `.asm`). Lệnh hợp ngữ là ngôn ngữ cấp thấp, con người vẫn có thể hiểu được nhưng nó phụ thuộc hoàn toàn vào lệnh bộ xử lý đích (target processor commands).


<figure>
  <img
    src="{{ site.baseurl }}\assets\images\Compilation_stage.png"
  />
</figure>

Giai đoạn này thường được chia thành 3 tác vụ/thành phần xử lý chính:

1. **Front End Processing (Phân tích cú pháp - Syntax Analysis):**
    
    - **Trình phân tích (Parser)** của compiler sẽ chia nhỏ mã nguồn thành các thẻ (tokens) và **kiểm tra cú pháp** để đảm bảo các câu lệnh được viết đúng theo tiêu chuẩn của ngôn ngữ được sử dụng (ví dụ: C/C++). Các tokens này có thể là:
        - Keyword (ví dụ: `int`, `while`)
        - Toán tử (operator) (ví dụ: `*`)
        - Định danh (identifier) (ví dụ: variable/function/array/structure name)
        - Hằng số (literals) (ví dụ: 0, 'A' hoặc "hello")

    - Nếu phát hiện bất kỳ đoạn code nào vi phạm cú pháp, lỗi sẽ được báo cáo ngay cho lập trình viên tại bước này.
    
    - Sau khi cú pháp được xác nhận hợp lệ, compiler tạo ra một cây phân tích cú pháp (parse tree) và chuyển đổi mã nguồn thành dạng **Biểu diễn trung gian (Intermediate Representation - IR)**, thường có dạng Cây cú pháp trừu tượng (Abstract Syntax Tree - AST) hoặc mã giả (pseudo-code). Đây là dạng mã giả độc lập với phần cứng, giúp nhà cung cấp compiler (compiler vendor) có thể hỗ trợ nhiều ngôn ngữ và nền tảng vi điều khiển khác nhau mà không cần phải kết hợp hàng loạt các công cụ khác nhau. Hiện có một số thư viện IR đang được sử dụng, ví dụ như *Gimple* được compiler GCC sử dụng.

2. **Middle-end Processing:**
    
    - **Phân tích ngữ nghĩa (Semantic Analysis):** Mã IR tiếp tục trải qua bước phân tích ngữ nghĩa để kiểm tra cấu trúc logic và tạo bảng ký hiệu (symbol table, chứa debug information). Tại đây, compiler sẽ rà soát các vấn đề tiềm ẩn (ví dụ: biến chưa được khởi tạo, biến được khai báo nhưng không sử dụng đến) và thông báo dưới dạng cảnh báo (warning), chứ không phải lỗi (error).
    
    - **Tối ưu hóa (Optimisation):** compiler sẽ tự động biến đổi mã nguồn sao cho chức năng không đổi nhưng tạo ra phiên bản thực thi nhanh hơn hoặc tốn ít dung lượng hơn (bằng cách loại bỏ các đoạn mã thừa, tối ưu vòng lặp, mở rộng inline function, phân bổ thanh ghi,...).

3. **Back-end Processing:**
    
    - **Sinh mã (Code Generation):** Sử dụng bộ tạo mã (code generator), compiler chuyển đổi cấu trúc mã IR đã được tối ưu hóa thành các lệnh hợp ngữ tương đương, phù hợp với bộ xử lý đích.
    
    - **Phân bổ bộ nhớ (Memory Allocation):** compiler tiến hành phân bổ mã lệnh và dữ liệu vào các phân vùng (sections) bộ nhớ khác nhau. Trình liên kết (Linker) sẽ sử dụng thông tin trong các sections này để định vị các phần trong bộ nhớ. Các sections có thể được xác định bằng tên và/hoặc bằng các thuộc tính xác định loại thông tin chứa bên trong:
        
        - **Code:** opcode (tạo bởi compiler) được đặt vào vùng `.text` hoặc `.code`.
        
        - **Static data:** dữ liệu tĩnh được phân vào vùng `.data` (nếu đã khởi tạo) hoặc vùng `.bss` (nếu chưa khởi tạo).
        
        - **Constants:** mô hình C truyền thống đặt các đối tượng hằng do người dùng định nghĩa vào phần `.data`. Tuy nhiên, các hằng số thường được đặt trong phần `.text` hoặc `.code`. Hầu hết các compiler sẽ tối ưu hóa việc loại bỏ các hằng số số và sử dụng trực tiếp giá trị của chúng nếu có thể. Ngoài ra, nhiều bộ công cụ C hiện đại hỗ trợ một phần `.const` hoặc `.rodata` riêng biệt dành riêng cho các giá trị hằng số. Phần này có thể được đặt (trong ROM) tách biệt với phần `.data`. Về mặt kỹ thuật, đây là một phần mở rộng của bộ công cụ.
        
        - **Automatic variables:** Biến tự động là các biến được khai báo bên trong hàm, bao gồm tham số và các đối tượng tạm thời được trả về (temporary-returned-object - TRO) từ non-void function. Theo mô hình truyền thống, bộ nhớ của chúng được cấp phát trên *Stack*: tham số và TRO do hàm gọi cấp phát, còn biến cục bộ được cấp phát khi hàm bắt đầu thực thi và được giải phóng khi hàm kết thúc, nhờ đó hỗ trợ cơ chế đệ quy. Tuy nhiên, compiler không tạo vùng nhớ `.stack`. Thay vào đó, nó sinh mã lệnh truy cập bộ nhớ thông qua *Stack Pointer*, được khởi tạo khi chương trình bắt đầu. Trên nhiều vi điều khiển hiện đại, đặc biệt là kiến trúc RISC 32-bit như ARM, các biến tự động thường được lưu trong thanh ghi (register) thay vì trên stack để tăng hiệu năng.
        
        - **Dynamic data:** bộ nhớ của các dynamic objects được cấp phát từ *Heap* (`.heap` section). *Heap* (và *Stack*) không được compiler cấp phát trong quá trình biên dịch mà được Linker cấp phát trong quá trình liên kết.

<details markdown="block">
<summary><i>Constants</i></summary>

> Hằng số có thể có hai dạng:
> - Các đối tượng hằng số do người dùng định nghĩa (ví dụ: const int c;)
> - Hằng số ('số ma thuật', định nghĩa macro hoặc chuỗi ký tự).
>
> Mô hình C truyền thống đặt các đối tượng hằng do người dùng định nghĩa vào phần `.data`, cùng với các biến tĩnh không phải hằng. Vì vậy chúng có thể không thực sự là hằng số - đây là lý do tại sao C không cho phép sử dụng số nguyên hằng để khởi tạo mảng.
{: .codeBlock }
</details>

Kết quả của giai đoạn này là các file mã Assembly (`.s` hoặc `.asm`).

*Lưu ý:* Một số compiler hỗ trợ chức năng assembler tích hợp (integrated assembler), chúng được gọi là Cross Compiler. Khi đó Compilation stage sẽ tạo trực tiếp mã máy (machine code) được lưu trong các file đối tượng (`.o` hoặc `.obj`), tránh tạo các file mã Assembly và gọi trình hợp ngữ (assembler). Điều này sẽ làm giảm thiểu độ trễ trong quá trình biên dịch.


---

# Assembly stage

Giai đoạn Assembly (Hợp ngữ) đảm nhận nhiệm vụ chuyển đổi các assembly program thành object program. Kết quả đầu ra là các file đối tượng (`.o` hoặc `.obj`), bao gồm các lệnh thực tế được bộ xử lý đích thực thi.

Cụ thể, trình hợp ngữ (Assembler) sẽ tiếp nhận đầu vào là các file mã Assembly (`.s` hoặc `.asm`) được sinh ra từ Compilation stage và thực hiện các tác vụ chi tiết sau:

- **Chuyển đổi lệnh thành mã máy (Machine Code):** Assembler dịch các lệnh gợi nhớ của hợp ngữ (assembly mnemonics) thành các chuỗi mã máy dưới định dạng nhị phân (0 và 1) để bộ xử lý đích có thể hiểu và thực thi được. Quá trình này thường đơn giản hơn biên dịch vì nó mang tính chất **ánh xạ 1-1** (một lệnh hợp ngữ sẽ dịch thành một lệnh mã máy tương ứng) do mã Assembly đã được thiết kế bám sát vào kiến trúc tập lệnh của một bộ xử lý cụ thể.

- **Xử lý nhãn và phân bổ địa chỉ:** Assembler chịu trách nhiệm chuyển đổi các toán hạng mang tính đại diện (symbolic names/operands) thành các địa chỉ máy thực tế. 

- **Xác định định dạng lệnh:** Định dạng và quyết định cấu trúc lệnh phù hợp để chuyển đổi các hằng số dữ liệu vào hệ thống.

- **Đóng gói thành File Object:** Assembler thu thập tất cả các mã máy vừa được dịch và ghi chúng ra một file mới gọi là **Object file (file đối tượng)**. 

Đặc điểm của file đầu ra ở giai đoạn này:

- File đối tượng thường có phần mở rộng là `.o` (trên UNIX/Linux) hoặc `.obj` (trên DOS/Windows). Tên của file này sẽ giữ nguyên theo tên của file mã nguồn gốc (ví dụ: file `main.c` sẽ tạo ra `main.o`).

- Nội dung của file `.o` hoàn toàn là mã nhị phân. File `.o` không khác gì ngoài một tập hợp các mã máy của file `.c`.

- Các file `.o` này còn được gọi là *relocatable object files* (file đối tượng có thể tái định vị). Tuy nó chứa opcodes (các mã lệnh mà vi xử lý hiểu được), data sections (chỉ chứa static variables), pc-relative addresses (địa chỉ tương đối theo bộ đếm chương trình), "immediate" constants,... nhưng nó **chưa thể thực thi độc lập** ngay lúc này. Nguyên nhân là do các static addresses và global addresses trong bộ nhớ hay các cross-reference (tham chiếu chéo) (ví dụ: một biến global khai báo ở file khác hoặc hàm `printf` nằm ở thư viện chuẩn ) vẫn bị thiếu hoặc chỉ đang được lưu dưới dạng độ lệch địa chỉ (offsets), tức mỗi file `.o` đều bắt đầu từ địa chỉ `0x00000000`.

Để các file `.o` rời rạc này có thể hoạt động cùng nhau và tạo thành một chương trình hoàn chỉnh, chúng bắt buộc phải bước vào giai đoạn cuối cùng là **Linking (Liên kết)**.

---

# Linking stage

Giai đoạn Linking (Liên kết) là nơi trình liên kết (linker) tiếp nhận các file đối tượng (relocatable object files `.o` hoặc `.obj`) từ Assembly stage và kết hợp chúng cùng với các thư viện để tạo thành một chương trình thực thi duy nhất.

Linker có thể được gọi là linker-script file, linker configuration file hoặc scatter-loading description file.

Hoạt động của linker có thể được điều khiển bằng các command-line hoặc bằng Linker Control File (LCF). File LCF định nghĩa bố cục bộ nhớ vật lý (Flash/SRAM) và vị trí của các vùng chương trình khác nhau (program regions). LCF syntax phụ thuộc rất nhiều vào compiler, vì vậy mỗi compiler sẽ có định dạng riêng, mặc dù vai trò của LCF về cơ bản là giống nhau trong tất cả các trường hợp.

Linker sẽ thực hiện các nhóm tác vụ cốt lõi sau:

- **Phân giải ký hiệu (Symbol Resolution):** Linker rà soát và giải quyết các tham chiếu chéo giữa các file đối tượng với nhau. Nó đảm bảo rằng mỗi ký hiệu (ví dụ: một lời gọi hàm hay một biến toàn cục được định nghĩa ở file này nhưng lại được sử dụng ở file khác) đều được gắn với một địa chỉ bộ nhớ duy nhất. Nếu có tham chiếu chưa được giải quyết, linker sẽ tự động tìm kiếm trong các file thư viện/lưu trữ (liberty file `.lib` / archive file `.a`) để bổ sung. 

- **Liên kết thư viện (Library Linking):** Linker có nhiệm vụ ghép nối các hàm thư viện chuẩn (chẳng hạn như hàm `puts` hoặc `printf`) hoặc các thư viện của bên thứ ba vào mã đối tượng của chương trình. Quá trình này có thể diễn ra theo hai cách:

  - **Static Linking (Liên kết tĩnh):** Sao chép toàn bộ code của các hàm thư viện trực tiếp vào file thực thi tại thời điểm biên dịch.

    - Ưu điểm: chương trình chạy nhanh hơn vì không cần đọc tên thư viện rồi thực hiện link. Vì các thư viện luôn có sẵn trong ứng dụng, nên không cần quan tâm về version của thư viện trên môi trường của người dùng khác.
  
    -Nhược điểm: tăng dung lượng file nhị phân do object code chứa cả library code. Tốn thời gian re-build mỗi khi thay đổi thư viện.

  - **Dynamic Linking (Liên kết động):** Không sao chép toàn bộ code mà chỉ lưu tên tham chiếu của thư viện vào file nhị phân, thư viện thực sự sẽ chỉ được nạp (load) và liên kết (link) vào bộ nhớ khi chương trình bắt đầu chạy (run-time).

    - Ưu điểm: giảm kích thước file nhị phân. Quá trình re-compile chỉ compile code mà bỏ qua library code. Chương trình sẽ chạy nhanh hơn và đỡ tốn bộ nhớ RAM hơn do thư viện chỉ được liên kết ngay tại thời điểm cần thiết chứ không nạp sẵn từ đầu.

- **Nối phân vùng (Section Concatenation):** Linker thu thập và gộp các sections có cùng chức năng (ví dụ như các đoạn code ở vùng `.text`, dữ liệu ở vùng `.data`, `.bss`) từ nhiều file đối tượng đầu vào thành các sections tổng hợp lớn hơn.

- **Tái định vị và Phân bổ địa chỉ tuyệt đối (Relocation & Section Location):** Sau khi gộp phân vùng, Linker sẽ điều chỉnh lại các đoạn code và dữ liệu, thay thế các địa chỉ tương đối (độ lệch) bằng các địa chỉ bộ nhớ tuyệt đối thực tế. Trong lập trình vi điều khiển (nhúng), tác vụ này được điều khiển bởi một **Linker Script File** (thường có đuôi `.ld` hay `.lsl`) để quy định chính xác địa chỉ bắt đầu và dung lượng vật lý của các vùng nhớ như Flash hay RAM.

  - Kích thước và vị trí của Stack và Heap cũng được linker quy định. Heap được đặt ở địa chỉ thấp hơn trong RAM và Stack ở địa chỉ cao hơn để giảm thiểu khả năng hai vùng này chồng chéo lên nhau (Heap phát triển lên trên bộ nhớ và Stack phát triển xuống dưới) và gây lỗi cho nhau trong quá trình thực thi.

  - Bố cục bộ nhớ thông thường sẽ là:

    - Section `.cstartup` (the system boot code) đặt ở đầu bộ nhớ Flash.

    - Các section `.text` và `.rodata` được lưu trữ trong Flash vì chúng cần được lưu giữ lâu dài.

    - Stack và Heap nằm trong bộ nhớ RAM. 

    - Section `.bss` nằm trong RAM và sẽ được reset về 0 khi khởi động.

    - Section `.data` nằm trong RAM (để xử lý trong quá trình chạy) nhưng phần khởi tạo của nó là `.sdata` lại nằm trong ROM.

Kết quả cuối cùng thu được là một file thực thi (executable file) duy nhất.

- Trên môi trường máy tính thông thường, các file này thường có định dạng là `.exe` (đối với Windows/DOS) hoặc `a.out` (đối với UNIX/Linux).

- Đối với hệ thống vi điều khiển, đầu ra tiêu chuẩn phổ biến (đặc biệt khi dùng compiler GCC) là **ELF** file  (Executable and Linkable Format, định dạng là `.elf`) phục vụ cho cả việc thực thi và gỡ lỗi (debug and executable file), hoặc **DWRAF** file (Debugging with Attributed Record Format, thường có định dạng là `.dwarf` or `.dwo`). ELF hoặc DWARF là các định dạng file đầu ra không phụ thuộc vào bộ xử lý đích. Để được tải lên, ELF file phải được chuyển đổi sang định dạng Flash/PROM gốc (thường là `.bin` hoặc `.hex`) thông qua Objcopy tool.

- Một số định dạng khác là `.srec`, `.axf`,...


---

# So sánh Compiler và Interpreter

<table class="hover-table">
  <thead>
    <tr>
      <th>Compiler</th>
      <th>Interpreter</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Compiler filters the entire program in one go.</td>
      <td>Interprets program each announcement in turn.</td>
    </tr>
    <tr>
      <td>As it examines the code in one go, the blunders (assuming any) appear toward the end together.</td>
      <td>Thinking of it as sweeps code each line in turn, blunders are indicated line by line.</td>
    </tr>
    <tr>
      <td>As it examines the code in one go, the blunders (assuming any) appear toward the end together.</td>
      <td>Because of mediators being delayed in executing the article code, it is favored less.</td>
    </tr>
    <tr>
      <td>It changes over the guidelines into orderly code.</td>
      <td>It doesn’t change over the guidelines rather it legitimately takes a shot at source language.</td>
    </tr>
    <tr>
      <td>C, C#,...</td>
      <td>Python Perl, SNOBOL,...</td>
    </tr>
  </tbody>
</table>

---

# So sánh Assembler và Interpreter


<table class="hover-table">
  <thead>
    <tr>
      <th>Assembler</th>
      <th>Interpreter</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>It changes over low-level language to the machine language.</td>
      <td>It changes over significant level language to the machine language.</td>
    </tr>
    <tr>
      <td>The program for an Assembler is composed for specific equipment.</td>
      <td>The program for an Interpreter is composed for a specific language.</td>
    </tr>
    <tr>
      <td>It is balanced for example one guidance means just a single guidance</td>
      <td>It is one to numerous for example one guidance means numerous guidance.</td>
    </tr>
    <tr>
      <td>It deciphers the whole program before running.</td>
      <td>It interprets program directions line by line.</td>
    </tr>
    <tr>
      <td>Blunders are shown before the program is running.</td>
      <td>Mistakes are shown for the each deciphered guidance (assuming any).</td>
    </tr>
    <tr>
      <td>It is utilized as just one opportunity to make an executable document.</td>
      <td>It is utilized each time when the program is running.</td>
    </tr>
    <tr>
      <td>Necessity of memory is less.</td>
      <td>Prerequisite of memory is more.</td>
    </tr>
    <tr>
      <td>Programming language that it converts is Assembly language.</td>
      <td>Programming languages that it converts are PHP, Python, Perl, Ruby.</td>
    </tr>
  </tbody>
</table>



---

# Tham khảo

[1] [CalleLuks, "The Four Stages of Compiling a C Program"](https://www.calleluks.com/the-four-stages-of-compiling-a-c-program/#:~:text=Compiling%20a%20C%20program%20is,compilation%2C%20assembly%2C%20and%20linking)

[2] [FastBitLab, "Microcontroller Embedded C Programming Lecture 55 – Embedded Project Build Process"](https://fastbitlab.com/blog/microcontroller-embedded-c-programming-lecture-55-embedded-project-build-process/#google_vignette)

[3] [Teach Computer Science, "The Four Stages of Compilation"](https://teachcomputerscience.com/the-four-stages-of-compilation/#3_Extending_macros)

[4] [LinkedIn, "Understanding C Build Process: From Source Code to Executable"](https://www.linkedin.com/pulse/understanding-c-build-process-from-source-code-haresh-sondagar-gptof)

[5] [Lập Trình Điện Tử, "Build"](https://www.laptrinhdientu.com/2021/08/Build.html)

[6] [Lập Trình Điện Tử, "Preprocessor"](https://www.laptrinhdientu.com/2021/08/Preprocessor.html)

[7] [Lập Trình Điện Tử, "Linking"](https://www.laptrinhdientu.com/2021/08/Linking.html)

[8] [Abhishek Anand, "Compilation Process of a C Program"](https://abhishek-anand.medium.com/compilation-process-of-a-c-program-f06c22e91fd4)


<!-- 

Các nội dung chưa được thêm vào hoặc Cần được làm rõ:

1. Cross compiler
- That compiler itself takes care of all the stages like it does Preprocessing, Parsing, Assembling, and linking.

2. Post processing tool

- A tool gather more information about the executable which is generated. E.g. the size of the executable (the size of the code section, the size of the data section, the size of the bss section, etc).

3. Relocatable machine code
4. target processor

5. Compiler chèn các lệnh hợp ngữ nội tuyến vào mã C và sử dụng nhiều chương trình hợp ngữ.

6. So sánh Compiler và Interpreter

7. One of the basic function of assembler is assigning machine delivers to emblematic names

8. So sánh Assembler và Interpreter

9. DWARF (Debugging with Attributed Record Format)
https://wiki.osdev.org/DWARF



10. https://www.geeksforgeeks.org/c/c-identifiers/
11. https://www.geeksforgeeks.org/c/literals-in-c-cpp-with-examples/
12. https://www.geeksforgeeks.org/c/keywords-in-c/
12. https://www.geeksforgeeks.org/c/inline-function-in-c/


 -->











<!-- 
Thuật ngữ:


Quá trình biên dịch (Compilation)
mã nguồn (source code)
mã đối tượng (object code)
Preprocessor (bộ tiền xử lý)
Compiler (Trình biên dịch)
Assembler (trình hợp ngữ)
Linker (Trình liên kết)

System software (Phần mềm hệ thống) - các chương trình máy tính được thiết kế để chạy trên phần cứng và ứng dụng máy tính.


ngôn ngữ cấp cao (high-level language - HLL)
ngôn ngữ cấp máy (machine-level languages)
mã máy tuyệt đối (absolute machine codes)
khối chương trình (program block)


chương trình hợp ngữ (assembly program)
lệnh hợp ngữ (assembly code/assembly mnemonics)


file thư viện (liberty file .ld)
file lưu trữ (archive file .a)
Cây cú pháp trừu tượng (Abstract Syntax Tree - AST)
mã giả (pseudo-code)
bảng ký hiệu (Symbol Table, `.symtab`): Lists all defined and referenced functions, variables, and global labels in the file, mapping their names to temporary locations or declaring them as external.

Relocation Table (`.rel.text`, `.rel.data`): Contains instructions on how to patch memory addresses. It details which specific instructions need to be updated when the linker moves the code into its final memory layout.

Mã máy (Machine code) -  is the raw binary or hexadecimal sequence of instructions a CPU executes directly. Each instruction is broken down into an opcode (short for "operation code") and its operands, which act together to tell the computer exactly what math, memory, or logic operation to perform.

Mã lệnh (Operation Code - Opcode) - là những câu lệnh được bộ xử lý hiểu để thực hiện một thao tác. It dictates what the computer needs to do (e.g., ADD or MOV). In pure machine code, this is simply a specific numerical value (like 1001000100 for ARM).

Toán hạng (Operands) - Dictate what the opcode applies to. They contain the data or the memory/register addresses the CPU needs to manipulate.

"immediate" constant - a fixed, hardcoded value embedded directly into the instruction itself. Instead of loading a number from a memory address or register, the processor decodes the value right from the instruction word, which makes it incredibly fast to access.

PC-relative addresses (địa chỉ tương đối theo bộ đếm chương trình) là phương pháp tính địa chỉ mục tiêu bằng cách lấy giá trị trong thanh ghi PC (Program Counter) cộng với một độ lệch (offset). Nó thường được dùng trong lập trình hợp ngữ để thực hiện các lệnh rẽ nhánh (branch) hoặc gọi hàm.

tham chiếu chéo (cross-referencing - xref) means mapping and tracking the exact locations (file names and line numbers) where specific named identifiers or symbols occur throughout a program's source tree. This mechanism establishes explicit connections between different elements of a codebase—such as linking a function call to its declaration or showing everywhere a variable is read or written.

file điều khiển trình liên kết (Linker Control File - LCF)









 -->




 
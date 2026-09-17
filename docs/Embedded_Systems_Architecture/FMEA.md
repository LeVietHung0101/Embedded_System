---
title: FMEA
parent: Embedded Systems Architecture
nav_order: 31
---

<h1>Failure Mode and Effects Analysis (FMEA)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. FMEA là gì?

{: .note}
> **Failure Mode and Effects Analysis (FMEA)** là một phương pháp giảm thiểu lỗi có hệ thống, giúp xác định tất cả các lỗi có thể xảy ra đối với các thành phần của một thiết kế, quy trình sản xuất, dịch vụ hoặc sản phẩm trước khi chúng thực sự xuất hiện.

> <i>Failure Mode and Effects Analysis (FMEA): Phân tích mô hình rủi ro và tác động của chúng</i>

FMEA phân tích nguyên nhân gây ra lỗi, suy luận tác động của lỗi và ưu tiên các hành động khắc phục dựa trên hệ thống xếp hạng đánh giá rủi ro. 

Các tổ chức có thể sử dụng FMEA để đánh giá cả các quy trình hiện có và các quy trình mới trước khi triển khai. Bằng cách tập trung vào các rủi ro có tiềm năng tác động cao nhất, quy trình từng bước của FMEA giúp các tổ chức chủ động cải thiện hiệu quả độ tin cậy, giảm chi phí do lỗi, tăng cường khả năng phục hồi hoạt động. Các tổ chức đang tăng cường ứng dụng trí tuệ nhân tạo (AI) vào quản lý vận hành để cải thiện khả năng dự đoán lỗi và tự động phát hiện rủi ro bằng cách sử dụng dữ liệu vận hành theo thời gian thực.

---

# 2. Các loại FMEA

Nhiều phương pháp FMEAs đã được phát triển để bao phủ nhiều ngành công nghiệp và quy trình khác nhau. Các loại FMEA khác nhau áp dụng cho các giai đoạn cụ thể của vòng đời sản phẩm và hoạt động, cung cấp cho các tổ chức khuôn khổ (framework) cần thiết để áp dụng phân tích rủi ro nhằm đạt được giá trị chiến lược tối đa.

Các loại FMEA gồm:

- **Design FMEA (DFMEA)**: tập trung vào quy trình thiết kế sản phẩm và được sử dụng để giảm thiểu các lỗi thiết kế (chẳng hạn như vấn đề về lựa chọn vật liệu và dung sai) trước khi bắt đầu sản xuất.

- **Process FMEA (PFMEA)**: bao gồm các quy trình sản xuất và lắp ráp. Phương pháp này nhằm ngăn ngừa các lỗi sản xuất phát sinh do sự biến động của quy trình, sai sót của con người hoặc hỏng hóc thiết bị.

- **System FMEA (SFMEA)**: là hoạt động đánh giá ở cấp độ tổng thể về sự tương tác giữa một hệ thống hoàn chỉnh và các hệ thống con của nó. Mục tiêu của SFMEA là xác định các rủi ro mang tính hệ thống và ngăn ngừa tình trạng lỗi dây chuyền.

- **Service FMEA**: áp dụng các nguyên tắc của PFMEA vào các giao dịch và quy trình cung cấp dịch vụ, chú trọng vào tính nhất quán, độ tin cậy và trải nghiệm khách hàng.

- **Software FMEA (SW-FMEA)**: phân tích kiến ​​trúc và logic phần mềm để xác định các dạng lỗi tiềm ẩn, chẳng hạn như lỗi lập trình (bug), vấn đề về độ trễ hoặc sự không tương thích của hệ thống.

- **Machinery FMEA (MFMEA)**: tập trung vào máy móc và thiết bị nhằm giảm thiểu thời gian ngừng hoạt động và rủi ro trong quá trình vận hành.

- **Monitoring and system response (FMEA-MSR)**: là phương pháp bổ sung nhằm đánh giá khả năng giám sát hiệu suất và phản ứng với sự cố của hệ thống trong quá trình sử dụng thực tế.

- **Failure mode, effects and criticality analysis (FMECA)**: mở rộng FMEA tiêu chuẩn bằng cách định lượng phân tích mức độ nghiêm trọng để ưu tiên rủi ro chính xác hơn.

---

# 3. Các bước FMEA

Ban đầu, FMEA được phát triển bởi quân đội Hoa Kỳ vào những năm 1940. Giờ đây, nó được công nhận trên toàn cầu như được định nghĩa trong [Sổ tay FMEA AIAG & VDA](https://www.aiag.org/training-and-resources/manuals/details/FMEAAV-1) năm 2019. AIAG & VDA FMEA kết hợp các thực tiễn tốt nhất của  AIAG và VDA. Việc tiêu chuẩn hóa FMEA tạo điều kiện thuận lợi cho sự nhất quán trong đánh giá rủi ro và quản trị chất lượng.

> <i>AIAG - US’s Automotive Industry Action Group: Nhóm Hành động Công nghiệp Ô tô Hoa Kỳ.</i><br>
> <i>VDA - German Association of the Automotive Industry: Hiệp hội Công nghiệp Ô tô Đức.</i>

FMEA hướng dẫn các tổ chức thông qua một phương pháp luận từng bước, được tiêu chuẩn hóa, gồm:
1. **Planning and preparation**: Xác định mục tiêu và phạm vi của đợt phân tích. Thành lập đội ngũ làm việc đa chức năng (kỹ thuật, vận hành, chất lượng, chuỗi cung ứng) và chuẩn bị các công cụ, mẫu biểu cần thiết.

2. **Structure analysis**: Chia nhỏ sản phẩm, hệ thống hoặc quy trình thành từng phần chi tiết. Bước này sử dụng workflow diagrams hoặc process mapping nhằm làm rõ sự phụ thuộc lẫn nhau giữa các thành phần.

3. Function analysis: Xác định rõ mục đích và chức năng yêu cầu của từng bước hoặc từng thành phần đã được liệt kê ở bước 02. Điều này giúp hiểu rõ cơ chế hoạt động trước khi tìm kiếm các điểm lỗi.

4. **Failure analysis**: Nhận diện các điểm có thể phát sinh lỗi cho từng chức năng:
  - **Failure Mode (FM):**: Cách thức cụ thể mà quy trình hoặc sản phẩm không đạt yêu cầu.
  - **Failure Effect (FE)**: Hậu quả kéo theo đối với hệ thống, sự an toàn hoặc người dùng.
  - **Failure Cause (FC)**: Nguyên nhân gốc rễ gây ra lỗi.

5. **Risk analysis**: Đánh giá mức độ rủi ro của từng mô hình lỗi theo 3 chỉ số từ 1 đến 10:
  - **Severity (S)**: Mức độ nghiêm trọng.
  - **Occurrence (O)**: Tần suất xảy ra.
  - **Detectability (D)**: Khả năng phát hiện.<br>
Xếp hạng ưu tiên xử lý thông qua chỉ số **RPN (Risk Priority Number)** hoặc hệ thống **AP (Action Priority: High, Medium, Low)**.

6. **Optimization**: Xác định, lập kế hoạch và thực hiện các hành động khắc phục/ngăn ngừa đối với các rủi ro có độ ưu tiên cao. Mục tiêu là làm giảm thiểu *Mức độ nghiêm trọng (S)*, giảm *Tần suất xảy ra (O)* hoặc tăng *Khả năng phát hiện (D)*.

7. **Results**: Tài liệu hóa toàn bộ quá trình, các phát hiện, biện pháp xử lý đã thực hiện và mức độ giảm rủi ro sau tối ưu hóa vào bảng tính FMEA. Báo cáo này giúp duy trì tính minh bạch, hỗ trợ tuân thủ quy định và làm cơ sở cho các kế hoạch kiểm soát chất lượng về sau.

---

# RPN (Risk Priority Number) và AP (Action Priority)

**RPN** là kết quả của phép nhân giữa các chỉ số *Mức độ nghiêm trọng (S)*, *Tần suất xảy ra (O)* và *Khả năng phát hiện (D)*. Mỗi chỉ số được đánh giá trên thang điểm từ 1 đến 10, do đó giá trị RPN dao động trong khoảng từ 1 đến 1000.

```c
RPN = S x O x D
```

> <i>Ví dụ:</i><br>
> <i>Sự cố nổ lốp có thể được chấm điểm như sau:</i>
> - <i>Mức độ nghiêm trọng <b>S = 10</b></i>
> - <i>Tần suất <b>O = 2</b></i>
> - <i>Khả năng phát hiện <b>D = 3</b></i>
> 
> <i>Dẫn đến chỉ số <b>RPN = 60</b>. Chỉ số phát hiện cao phản ánh khả năng phát hiện kém; điểm số 10 đồng nghĩa với việc lỗi đó gần như không thể bị phát hiện.</i>
> 
> <i>Các nhóm làm việc sẽ sắp xếp các mô hình lỗi theo chỉ số RPN, xử lý dựa trên mức độ ưu tiên, sau đó tính toán lại chỉ số này sau khi đã thực hiện các biện pháp khắc phục.</i>

Phương pháp RPN tồn tại những hạn chế về mặt cấu trúc. Do các chỉ số *Mức độ nghiêm trọng*, *Tần suất* và *Khả năng phát hiện* được đo lường trên thang điểm thứ bậc (ordinal scale), việc nhân chúng với nhau sẽ gây ra những nghi ngại về mặt thống kê; hơn nữa, các giá trị RPN giống nhau có thể che giấu những đặc điểm rủi ro hoàn toàn khác biệt. *Ví dụ: Một lỗi có điểm số S=10, O=2, D=2 sẽ cho kết quả RPN là 40 và có thể bị xếp hạng thấp hơn một lỗi có điểm số S=7, O=5, D=4 (với RPN là 140), mặc dù lỗi có mức độ nghiêm trọng bằng 10 lẽ ra cần được ưu tiên xử lý trước.* Ngoài ra, các ngưỡng RPN cố định có thể khiến các nhóm coi con số này như một lý do để trì hoãn việc đưa ra quyết định.

Phương pháp FMEA theo tiêu chuẩn AIAG & VDA sử dụng **AP (Action Priority)** làm công cụ ra quyết định chính thay vì chỉ dựa vào RPN. AP hoạt động dựa trên bảng tra cứu với ba mức:
- **High-priority (H)**: lỗi cần được xử lý ngay lập tức.
- **Medium-priority (M)** lỗi cần được khắc phục, nhưng không khẩn cấp bằng các lỗi có mức độ ưu tiên cao (H).
- **Low-priority (L)** lỗi có thể được theo dõi và không cần hành động khắc phục.

Chỉ số *Mức độ nghiêm trọng (S)* được ưu tiên xem xét hàng đầu, tiếp đến là *Tần suất xảy ra (O)* và cuối cùng là *Khả năng phát hiện (D)*. 

Cấu trúc này giúp ngăn chặn tình trạng các rủi ro nghiêm trọng về an toàn bị bỏ qua hoặc lu mờ do điểm số tần suất thấp hoặc điểm số khả năng phát hiện cao. Các phương pháp đánh giá rủi ro hiện đang được áp dụng bao gồm: xếp hạng dựa trên RPN, AP và *Phân tích mức độ nghiêm trọng theo kiểu quân sự* (*Military-style criticality analysis*, còn được gọi là FMECA).

---

# FMEA và Root Cause Analysis

FMEA và Root Cause Analysis (phân tích nguyên nhân gốc rễ) nằm ở hai phía đối lập của một sự kiện. FMEA mang tính dự báo (prospective), đặt câu hỏi "điều gì sẽ xảy ra nếu...?" trước khi vấn đề phát sinh. Ngược lại, Root Cause Analysis mang tính cải tiến (retrospective), đặt câu hỏi "chuyện gì đã xảy ra?" sau khi sự cố đã diễn ra.

Mối liên hệ giữa hai phương pháp này nằm ở phần xác định nguyên nhân. Tại đây, các nguyên nhân cần mô tả cơ chế cụ thể thay vì chỉ mang tính quy kết trách nhiệm. Trong **DFMEA**, các nguyên nhân cần đủ cụ thể để chỉ ra các yếu tố như tính chất vật liệu, hình học, kích thước và các điểm giao diện giữa các bộ phận. Cần tránh các từ ngữ chung chung như "xấu", "kém", "có lỗi" hay "hỏng hóc" vì chúng không xác định rõ nguyên nhân để có thể tính toán rủi ro một cách chính xác. Đối với **PFMEA**, việc xác định nguyên nhân thường dựa trên mô hình biểu đồ xương cá (Fishbone diagram) xoay quanh 6 yếu tố (*6Ms - Manpower, Machine, Material, Method, Measurement, Mother Nature*).

Các Root Cause được xác định trong FMEA có thể là cơ sở để triển khai *Nguyên tắc 8D* hoặc phương pháp *5 Whys*, và các kết quả thu được từ đó cần được cập nhật ngược lại vào FMEA. Khi phát sinh vấn đề trong quá trình sản xuất, nhóm thực hiện cần kiểm tra xem liệu FMEA hiện tại đã dự báo trước vấn đề đó hay chưa và mức độ rủi ro đã được đánh giá chính xác đến mức nào.

<details markdown="block">
<summary><i>Nguyên tắc 8D</i></summary>

> **Nguyên tắc 8D (Eight Disciplines)** là phương pháp giải quyết vấn đề có hệ thống gồm 8 bước chính (và 1 bước chuẩn bị ban đầu D0), do hãng Ford Motor Company phát triển nhằm tìm ra nguyên nhân gốc rễ, khắc phục lỗi và ngăn chặn tái diễn.
>
> Các bước trong quy trình 8D (9 giai đoạn):
> - **D0 - Lập kế hoạch và chuẩn bị (Plan and Prepare)**: Đánh giá tình hình, thu thập dữ liệu ban đầu và xem xét có cần hành động ứng phó khẩn cấp trước khi lập nhóm hay không.
> - **D1 - Thành lập nhóm (Establish a Team)**: Tập hợp một nhóm liên chức năng có kiến thức về sản phẩm/quy trình và quyền hạn để giải quyết vấn đề.
> - **D2 - Mô tả vấn đề (Describe the Problem)**: Xác định rõ vấn đề bằng các dữ liệu cụ thể (cái gì, ở đâu, khi nào, bao nhiêu).
> - **D3 - Hành động ngăn chặn tạm thời (Interim Containment Actions)**: Áp dụng ngay giải pháp tạm thời để bảo vệ khách hàng và ngăn lỗi lan rộng trong lúc tìm nguyên nhân.
> - **D4: Xác định nguyên nhân gốc rễ (Root Cause Analysis)**: Tìm ra nguyên nhân cốt lõi gây ra lỗi và lý do tại sao hệ thống kiểm tra lại bỏ sót lỗi đó (điểm thoát lỗi).
> - **D5 - Phát triển giải pháp vĩnh viễn (Develop Permanent Solution)**: Lựa chọn và thử nghiệm các hành động khắc phục lâu dài nhằm loại bỏ triệt để nguyên nhân gốc rễ.
> - **D6 - Thực thi và xác thực giải pháp (Implement and Validate)**: Đưa giải pháp chính thức vào vận hành, gỡ bỏ biện pháp tạm thời ở bước D3 và theo dõi dữ liệu thực tế.
> - **D7 - Ngăn ngừa tái diễn (Prevent Recurrence)**: Cập nhật quy trình, tài liệu, hệ thống quản lý để lỗi tương tự không lặp lại ở các khu vực khác.
> - **D8 - Ghi nhận và đóng vấn đề (Close Problem and Recognize Contributors)**: Đánh giá kết quả hoạt động của nhóm, tuyên dương đóng góp và chính thức khép lại sự cố. 
{: .codeBlock }
</details>

---

# Lợi ích của FMEA

FMEA mang lại nhiều lợi ích ở cấp độ doanh nghiệp, vượt xa phạm vi cải tiến chất lượng đơn thuần. 

Các lợi ích này bao gồm:
- Giảm chi phí do lỗi/hỏng hóc nhờ phát hiện rủi ro sớm.
- Nâng cao hình ảnh thương hiệu và giá trị mang lại cho khách hàng.
- Tăng độ tin cậy của sản phẩm hoặc dịch vụ cũng như mức độ hài lòng của khách hàng.
- Đảm bảo tuân thủ quy định tốt hơn và sẵn sàng cho công tác kiểm toán.
- Rút ngắn thời gian đưa sản phẩm ra thị trường nhờ chủ động giảm thiểu rủi ro.
- Tăng cường sự phối hợp và cộng tác liên chức năng giữa các nhóm.

---

# Tham khảo

[1] [TechTarget, "FMEA (Failure Mode and Effects Analysis)"](https://www.techtarget.com/it-strategy/definition/FMEA-Failure-Mode-and-Effects-Analysis)

[2] [IBM, "What is failure mode and effects analysis (FMEA)?"](https://www.ibm.com/think/topics/fmea)

<!-- 
https://quality-one.com/fmea/

https://tractian.com/en/glossary/fmea-failure-mode-and-effects-analysis

https://www.jamasoftware.com/requirements-management-guide/meeting-regulatory-compliance-and-industry-standards/fmea/

https://www.ifm.eng.cam.ac.uk/research/dmg/tools-and-techniques/fmea-failure-modes-and-effects-analysis/

https://softcomply.com/what-is-fmea-and-how-is-it-different-from-hazard-analysis/

https://asq.org/quality-resources/fmea?srsltid=AU7gw4WdGjFnnllR7op4xM53cUALRVRGsTc7WDDGkId29n3xAUplqM9V

https://tractian.com/en/glossary/fmea-failure-mode-and-effects-analysis
 -->
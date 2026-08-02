---
title: Power-on Reset
parent: Boot Process
nav_order: 3
---

<h1>Power-on Reset (POR)</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# 1. Định nghĩa

**Power-on reset (POR)** là một mạch chức năng quan trọng trong các hệ thống điện tử, có nhiệm vụ đảm bảo hệ thống khởi đầu một cách ổn định và tin cậy khi được cấp nguồn hoặc sau khi nguồn điện được khôi phục từ sự cố gián đoạn. Mạch này tạo ra một tín hiệu reset để đưa hệ thống về một trạng thái xác định và có thể dự đoán được ngay khi điện áp nguồn đạt đến một ngưỡng thiết lập sẵn.

---

# 2. Chức năng

Mạch POR thực hiện 3 chức năng cốt lõi sau:

1. **Giám sát điện áp:** Liên tục theo dõi mức điện áp nguồn để đảm bảo hệ thống chỉ bắt đầu hoạt động khi nguồn điện đủ an toàn.

2. **Trì hoãn hoạt động để ổn định:** Giữ cho vi xử lý hoặc vi điều khiển ở trạng thái reset cho đến khi ba điều kiện sau được thỏa mãn: (1) nguồn điện đã ổn định ở mức thích hợp, (2) xung clock của bộ xử lý đã ổn định và (3) các thanh ghi nội bộ đã được nạp đúng cách.

3. **Thiết lập trạng thái ban đầu:** Đảm bảo tất cả các mạch nội bộ, thanh ghi và bộ vi xử lý bắt đầu từ một trạng thái chuẩn, ngăn chặn các hành vi sai lệch hoặc vận hành không xác định.

---

# 3. Cấu tạo

Một mạch POR điển hình bao gồm 2 thành phần chính:

**Bộ giám sát điện áp (voltage monitoring component):** liên tục theo dõi và so sánh mức của điện áp nguồn (power supply voltage) với điện áp tham chiếu (hay điện áp ngưỡng). Khi điện áp nguồn tăng lên và đạt đến ngưỡng điện áp thiết lập (reference / threshold voltage), bộ giám sát điện áp sẽ kích hoạt tín hiệu reset. Bộ giám sát điện áp thường là một mạch so sánh (comparator circuit) hoặc một mạch phát hiện điện áp (voltage detector).
  
  - **Mạch so sánh (Comparator circuit)**: là một mạch so sánh điện áp nguồn với mạng chia điện áp (voltage divider network). Mạng chia điện áp bao gồm các điện trở tạo ra điện áp tham chiếu dựa trên một phần của điện áp nguồn.
  
  - **Mạch phát hiện điện áp (Voltage detector)**: là một mạch tích hợp chuyên dụng được thiết kế để giám sát điện áp nguồn. Nó thường có điện áp tham chiếu và mạch so sánh tích hợp.

**Bộ định thời (timing element):** Thường là một tụ điện hoặc mạng điện trở - tụ điện (RC). Giá trị của các linh kiện này (hằng số thời gian RC hoặc các phần tử định thời khác) quyết định khoảng thời gian trễ của tín hiệu reset. Độ trễ này cho phép đủ thời gian để nguồn điện ổn định và các thành phần hệ thống quan trọng được khởi tạo đúng cách.

> <i>Bộ định thời (timing element) chính là điểm khác biệt giữa mạch POR và mạch phát hiện điện áp (Voltage detector).</i>

Ngoài ra, **cổng Schmitt trigger** thường được thêm vào trong các thiết kế cho máy tính để giúp tín hiệu reset sạch hơn và dứt khoát hơn.

---

<!-- 
# 4. Cách hoạt động

Nguyên lý hoạt động của POR dựa trên sự kết hợp giữa bộ giám sát điện áp và bộ định thời:

1. **Kích hoạt tín hiệu reset:** Bộ giám sát điện áp liên tục so sánh điện áp nguồn với điện áp ngưỡng (hoặc điện áp tham chiếu). Ban đầu, điện áp nguồn thấp hơn ngưỡng và tín hiệu reset chưa được kích hoạt. Khi điện áp nguồn  bắt đầu tăng và đạt đến ngưỡng, bộ giám sát điện áp sẽ kích hoạt tín hiệu reset (thường là mức thấp - active-low). Tín hiệu reset sau đó được kết nối với reset pin của vi điều khiển, vi xử lý hoặc các thành phần hệ thống khác. Khi này, xung clock nội của bộ xử lý bắt đầu hoạt động. Tín hiệu reset này còn được gọi là **Power good signal**.

3. **Tạo độ trễ:** Thay vì ngắt tín hiệu reset ngay lập tức, bộ định thời sẽ duy trì tín hiệu reset thêm một khoảng thời gian để đảm bảo nguồn điện hoàn toàn ổn định và các thành phần hệ thống quan trọng được khởi tạo đúng cách (thiết lập mức logic ban đầu, xóa các thanh ghi nội bộ, khởi tạo các thiết bị ngoại vi và đưa hệ thống về trạng thái đã biết). Kết quả của giai đoạn này là (1) nguồn điện đã ổn định ở mức thích hợp, (2) xung clock của bộ xử lý đã ổn định và (3) các thanh ghi nội bộ đã được nạp đúng cách.

4. **Bắt đầu vận hành:** Sau khi hết thời gian chờ, tín hiệu reset bị ngắt, cho phép bộ vi xử lý thoát khỏi trạng thái reset và bắt đầu thực hiện chương trình từ một địa chỉ đã biết.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\PowerOn_Reset_Sequence_Ver1.png"
  />
</figure>

--- -->

# 4. Trình tự khởi động chi tiết

## Giai đoạn 1: Phát hiện cấp nguồn (Power-On Detection)

Khi nguồn ${V_{DD}}$ bắt đầu tăng từ 0V, mạch Power-On Reset (POR) liên tục giám sát điện áp nguồn để xác định xem thiết bị đã đạt đến mức điện áp tối thiểu cho phép hoạt động hay chưa. POR sử dụng các mức điện áp ngưỡng nội bộ để phát hiện quá trình cấp nguồn. Có hai mức điện áp ngưỡng liên quan đến POR:
- $\mathbf{V_{POR}}$: là ngưỡng điện áp mà tại đó module POR bắt đầu hoạt động.
- **POR Circuit Threshold Voltage**: Là ngưỡng kích hoạt của mạch POR để tạo ra sự kiện Power-On. Nó còn được gọi là điện áp *Low-Voltage Reset (LVR voltage)*.

Khi ${V_{DD}}$ vượt qua ngưỡng yêu cầu (*POR Circuit Threshold Voltage*) và đáp ứng các điều kiện về tốc độ tăng điện áp, một sự kiện Power-On được tạo ra và POR phát sinh một xung reset nội bộ (**POR Pulse**). Tại thời điểm này, thiết bị được đưa vào trạng thái Reset nhằm ngăn mọi hoạt động của hệ thống trước khi nguồn ổn định hoàn toàn. Đồng thời, module POR chuyển sang trạng thái ngủ (hibernate) để giảm tiêu thụ dòng điện.

> Ghi chú: ${V_{DD}}$ phải giảm xuống dưới mức ${V_{POR}}$ trước khi "một POR mới" có thể được kích hoạt.

## Giai đoạn 2: Ổn định mạch nội bộ (${T_{POR}}$)

Sau khi POR Pulse được tạo ra, mạch POR sẽ:
- Reset POR timer và chèn thêm một khoảng thời gian delay ngắn (khoảng 5 µs) gọi là ${T_{POR}}$ (Power-On Reset Delay) để đảm bảo các mạch phân cực nội bộ (bias circuits) của thiết bị đã đạt trạng thái ổn định.
- Đưa hệ thống vào trạng thái Reset: không cho phép bất kỳ hoạt động nào của CPU hoặc các khối logic hệ thống.
- Chọn nguồn clock của thiết bị (clock source) theo các *Oscillator Configuration bits*.

## Giai đoạn 3: Khởi tạo nguồn nội bộ (${T_{STARTUP}}$)

Sau khi ${T_{POR}}$ kết thúc, một khoảng delay ${T_{STARTUP}}$ luôn được chèn vào. ${T_{STARTUP}}$ được áp dụng mỗi khi thiết bị khôi phục hoạt động sau trạng thái tắt nguồn (power-down). Mục đích của khoảng delay ${T_{STARTUP}}$ là bảo đảm các nguồn điện áp nội bộ đã sẵn sàng trước khi thiết bị tiếp tục khởi động. Trong thời gian này, việc thực thi chương trình vẫn bị vô hiệu hóa.

Sau khi T

Đối với các thiết bị sử dụng bộ ổn áp nội (On-Chip Voltage Regulator), ${T_{STARTUP}}$ tương ứng với khoảng thời gian ${T_{VREG}}$, tức thời gian cần thiết để bộ ổn áp tạo ra mức điện áp ổn định cho lõi xử lý (core).

> ${T_{STARTUP}}$ = ${T_{VREG}}$ if the on-chip regulator is enabled.

Nếu bộ ổn áp nội không được sử dụng, thiết bị sẽ tự động kích hoạt bộ định thời khởi động nguồn PWRT (Power-Up Timer). PWRT tạo ra một khoảng trễ cố định ${T_{PWRT}}$ (khoảng 64 ms) nhằm bảo đảm nguồn bên ngoài đã ổn định hoàn toàn trước khi quá trình khởi động tiếp tục. Ở một số thiết bị, PWRT có thể bị vô hiệu hóa bằng bit cấu hình tương ứng.

> ${T_{STARTUP}}$ = ${T_{PWRT}}$ if the on-chip regulator is disabled.

> Ghi chú: Một số datasheet sử dụng thuật ngữ ${T_{PM}}$ (Program Memory Available Delay) thay cho ${T_{VREG}}$.

## Giai đoạn 4: Chọn và ổn định Clock Source

Ngay từ khi xảy ra sự kiện Power-On, thiết bị đã xác định clock source cần sử dụng dựa trên các Oscillator Configuration Bits được lưu trong Flash Configuration Words. Tuy nhiên, clock source được chọn vẫn cần thời gian để đạt trạng thái ổn định.

Sau khi ${T_{STARTUP}}$ kết thúc, tín hiệu reset hệ thống $\overline{SYSRST}$ được nhả (released) và hệ thống sẽ chờ thêm một khoảng thời gian tùy thuộc vào loại clock source đang sử dụng.

- Nếu dùng Crystal Oscillator, thiết bị sẽ chờ thời gian khởi động dao động ${T_{OST}}$ được tạo bởi Oscillator Start-up Timer - bộ đếm 10-bit sẽ đếm 1024 chu kỳ dao động trước khi truyền xung nhịp dao động (oscillator clock) về hệ thống. Nếu PLL (Phase-Locked Loop) được enabled, thời gian delay ${T_{LOCK}}$ (PLL Lock Time) sẽ được cộng thêm vào sau ${T_{OST}}$ (tức là chỉ bắt đầu sau khi ${T_{OST}}$ hoàn thành).

- Nếu sử dụng Fast RC Oscillator hoặc Low-Power RC Oscillator thì các khoảng thời gian tương ứng là ${T_{FRC}}$ hoặc ${T_{LPRC}}$ sẽ được áp dụng.

Trong giai đoạn này, clock source đang được khởi tạo và ổn định nhưng CPU vẫn chưa được phép thực thi chương trình.

## Giai đoạn 5: Nạp cấu hình từ Flash (TRST)

Sau khi clock source đã ổn định, hệ thống sẽ delay thêm một khoảng ${T_{RST}}$ (Internal State Reset time). Đây là một khoảng thời gian ngắn nhưng có vai trò rất quan trọng trong quá trình khởi động. Trong giai đoạn này:

- Phần cứng khởi động nội bộ của thiết bị sẽ đọc các Flash Configuration Words (FCW) trong Program Memory và sao chép các giá trị cấu hình vào các thanh ghi cấu hình (Configuration Registers) tương ứng. Quá trình này diễn ra sau mỗi lần Reset nhằm bảo đảm toàn bộ các tùy chọn cấu hình của thiết bị được áp dụng chính xác trước khi CPU bắt đầu hoạt động.

- Tín hiệu $\overline{SYSRST}$ đã được released trước đó và thiết bị không còn bị giữ trong trạng thái Reset. Tuy nhiên system clock vẫn bị chặn trong suốt thời gian ${T_{RST}}$. Do đó CPU chưa thể thực thi bất kỳ lệnh nào.

> Ghi chú: tín hiệu $\overline{SYSRST}$ còn được gọi là **power good signal**.

## Giai đoạn 6: Kích hoạt System Clock

Khi ${T_{RST}}$ kết thúc, tất cả các bước khởi tạo cần thiết đã hoàn thành. Tại thời điểm này, system clock chính thức được giải phóng (released) và bắt đầu được phân phối đến các khối logic của thiết bị. Từ góc nhìn của CPU, đây là thời điểm đầu tiên CPU thực sự nhận được clock để có thể hoạt động.

## Giai đoạn 7: Bắt đầu thực thi chương trình

Sau khi system clock được cấp cho CPU, bộ xử lý bắt đầu chu trình khởi động bình thường. CPU đọc Reset Vector từ Program Memory, thiết lập Program Counter và bắt đầu thực thi các lệnh đầu tiên của firmware. Kể từ thời điểm này, quá trình khởi động phần cứng đã hoàn tất và quyền điều khiển hệ thống được chuyển từ logic khởi động nội bộ sang chương trình ứng dụng của người dùng.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\PowerOn_Reset_Sequence_Ver2.png"
  />
  <figcaption>Power-On Reset Sequence<br>
  </figcaption>
</figure>

---

# 5. Lợi ích

## Vấn đề thực tế


Lợi ích chính của POR là đảm bảo tính toàn vẹn hoạt động (operational integrity) của hệ thống khi khởi động. Một mạch POR được thiết kế tốt có thể đảm bảo rằng, khi cấp nguồn cho máy tính, nó sẽ khởi động đúng cách mọi lúc. Để đạt được điều này, POR giải quyết hai vấn đề thực tế trong vật lý:

1.  **Thiết lập các điều kiện tin cậy (Reliable conditions):**
    - Các bộ nguồn thực tế cần một khoảng thời gian (vài miligiây) để bắt đầu, tăng dần và ổn định ở mức điện áp an toàn cho các mạch điện tử nhạy cảm.
    - Các mạch kỹ thuật số phụ thuộc rất nhiều vào mức nguồn cấp đã biết để hoạt động ổn định. Nếu nguồn cấp không đúng, không ổn định hoặc đang thay đổi (như lúc mới bật nguồn), các mạch này có thể hoạt động không thể dự đoán được.
    - **Ngăn chặn lỗi do sụt áp / quá áp:** Điện áp thấp có thể dẫn đến tình trạng sụt áp (brownout) gây ra lỗi điều kiện logic; điện áp quá cao (overvoltage) có thể gây ra quá áp làm hỏng các chip mỏng manh.
    - Mạch POR ngăn chặn thiết bị hoạt động trong các điều kiện không tin cậy bằng cách **giữ quá trình khởi tạo** cho đến khi xác nhận được mức điện áp vận hành đã tốt.

2.  **Đảm bảo mức năng lượng phù hợp (Suitable power levels):**
    - Các thiết bị kỹ thuật số khi mới cấp nguồn thường ở các trạng thái ngẫu nhiên.
    - Cần có một quy trình kiểm tra khi bật nguồn (power-on self-test - POST) được thiết lập cẩn thận để kiểm tra và khởi tạo các thiết bị, xóa và sắp xếp bộ nhớ, thiết lập các giao diện quan trọng và chuẩn bị phần cứng để nạp hệ điều hành.
    - Mạch POR đảm bảo trạng thái nguồn thô và không dự đoán được ban đầu **không bao giờ được phép thực hiện các vận hành thực tế**. Nó buộc hệ thống phải chờ cho đến khi có mức năng lượng phù hợp và hoàn tất chuỗi khởi tạo thành công.

## Lý do cần mạch POR

1.  **Khởi tạo hệ thống tin cậy (Reliable System Initialization):**
    - Đảm bảo hệ thống luôn bắt đầu ở một trạng thái xác định và có thể dự đoán được khi cấp nguồn.
    - Ngăn chặn vi xử lý khởi động với các giá trị ngẫu nhiên trong thanh ghi hoặc bộ đếm chương trình (Program Counter), điều có thể gây ra vận hành sai lỗi.
    - Giữ thiết bị ở trạng thái reset cho đến khi nguồn điện ổn định, xung clock đạt trạng thái chuẩn và các thanh ghi nội bộ được nạp đầy đủ.

2.  **Bảo vệ chống lại xung nhiễu điện áp (Protection against Voltage Glitches):**
    - Phát hiện các biến động điện áp hoặc quá trình chuyển đổi không ổn định trong lúc khởi động và giữ tín hiệu reset cho đến khi điện áp ổn định.
    - Có khả năng miễn nhiễu tốt hơn các bộ phát hiện điện áp thông thường nhờ khả năng phân tích cả kích thước và thời gian kéo dài của nhiễu để tránh các lệnh reset giả không cần thiết.

3.  **Tăng cường tính toàn vẹn của hệ thống (Enhanced System Integrity):**
    - Ngăn ngừa tình trạng hỏng hóc hoặc mất mát dữ liệu vốn thường xảy ra khi các mạch điện hoạt động trong trạng thái không xác định.
    - Đảm bảo tính nhất quán của dữ liệu và ngăn chặn các lỗi điều kiện logic do điện áp thấp (brownout) gây ra.

4.  **Đơn giản hóa thiết kế hệ thống (Simplified System Design):** Cung cấp một cơ chế chuẩn hóa để thiết lập trạng thái ban đầu, loại bỏ nhu cầu về các quy trình khởi tạo thủ công hoặc bằng phần mềm phức tạp. Việc sử dụng IC giám sát chuyên dụng giúp mạch điện đơn giản và tin cậy hơn so với việc tự thiết kế các mạch rời rạc (R-C) vốn dễ bị lỗi khi nguồn tăng chậm.

5.  **Tương thích với các chế độ năng lượng thấp (Compatibility with Low-Power Modes):**: Giám sát nguồn cấp khi hệ thống "thức dậy" từ các chế độ ngủ (sleep modes), đảm bảo quá trình chuyển đổi trở lại trạng thái hoạt động bình thường diễn ra suôn sẻ và an toàn.

6.  **Kéo dài tuổi thọ pin (Extend Battery Life):** Kiểm soát hoạt động của thiết bị trước khi điện áp pin sụt giảm quá sâu, giúp ngăn ngừa hư hỏng và tối ưu hóa thời gian sử dụng pin nhờ các bộ phát hiện điện áp độ chính xác cao.

7.  **Bổ sung tính dự phòng (Add redundancy):** Đóng vai trò như một cơ chế bảo vệ độc lập (fail-safe) bên cạnh các tính năng reset nội bộ của vi điều khiển, đặc biệt quan trọng trong các hệ thống đòi hỏi độ an toàn cao như ô tô hay thiết bị công nghiệp.

8.  **Giám sát quá áp (Overvoltage Monitoring):** Phát hiện tình trạng điện áp tăng cao bất thường để bảo vệ các linh kiện nhạy cảm và lõi hệ thống (MCU) khỏi bị hư hại.

9.  **Cảnh báo sớm sự cố nguồn (Power-fail/Low-line Signals):** Cung cấp tín hiệu cảnh báo khi sắp có sự cố sụt nguồn hoặc brownout, cho phép vi xử lý thực hiện quy trình sao lưu dữ liệu quan trọng trước khi bị reset hoàn toàn.

10. **Phối hợp trình tự nguồn và Reset (Power/Reset Sequencing):** Điều phối thứ tự cấp nguồn và thứ tự thoát reset cho các hệ thống có nhiều mức điện áp hoặc nhiều bộ vi xử lý, giúp ngăn chặn tình trạng chốt (latch-up) và đảm bảo sự đồng bộ.

11. **Hỗ trợ reset thủ công và gỡ lỗi (Manual Reset):** Cho phép người dùng hoặc hệ thống kích hoạt reset thông qua nút nhấn hoặc tín hiệu logic để khởi động lại vi xử lý khi bị treo mà không cần ngắt nguồn điện.

12. **Tích hợp giám sát phần cứng (Watchdog Timer):** Một số IC POR còn tích hợp đầu vào watchdog để giám sát các tín hiệu quan trọng hoặc tình trạng sức khỏe của phần cứng, tự động reset nếu phát hiện lỗi.

---

# 6. Phân loại

Mạch Power-on Reset (POR) có thể được phân loại dựa trên phương thức triển khai, số lượng nguồn giám sát, đặc tính ngưỡng điện áp và các tính năng bổ sung đi kèm. Dưới đây là các cách phân loại chi tiết:

## 6.1. Phân loại theo phương thức triển khai

Đây là cách phân loại phổ biến nhất dựa trên cấu tạo vật lý của mạch:

- **Mạch rời rạc (Discrete POR):** Được tạo ra bằng cách sử dụng mạng lưới điện trở và tụ điện (R/C). Mạch này đơn giản nên có độ tin cậy thấp vì phụ thuộc vào tốc độ tăng của nguồn điện và có thể gặp lỗi nếu nguồn bị ngắt rồi bật lại quá nhanh.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\The_Discrete_RC_POR.png"
  />
  <figcaption>Mạch Discrete R/C POR (a) dùng một bộ lọc RC vào reset pin để tăng thời gian ổn định của tín hiệu reset khi điện áp nguồn đang tăng lên. Tuy nhiên, do hằng số thời gian của mạch RC, khả năng phản ứng với các hiện tượng sụt áp nhanh (fast undershoot) có thể bị hạn chế, dẫn đến nó không đủ tin cậy trong hầu hết các ứng dụng.<br>Trong một số trường hợp, việc thêm một diode vào mạch (b), tạo thành bộ lọc R-C-diode, sẽ khắc phục các vấn đề về chu kỳ cấp nguồn nhanh và cải thiện hiệu suất của mạch.<br>
  </figcaption>
</figure>

- **Mạch nội bộ (Internal POR):** Được tích hợp sẵn bên trong các vi xử lý hoặc vi điều khiển, tự động tạo tín hiệu reset khi khởi động. Các mạch nội bộ này thường có thể được cấu hình và điều chỉnh thông qua các bit cấu hình nội bộ của chip. Mặc dù tiện lợi, nhưng các mạch này thường kém chính xác và có thể gặp vấn đề khi điện áp nguồn ở mức thấp hoặc bị sụt áp (brownout).

- **Mạch dựa trên cổng logic:** Sử dụng các cổng logic kết hợp với điện áp nguồn và các tín hiệu điều khiển khác để tạo ra tín hiệu reset. Chúng có thể là các mạch logic tổ hợp đơn giản hoặc các mảng cổng phức tạp hơn hay các thiết bị logic lập trình được như FPGA.

- **Mạch dựa trên IC giám sát chuyên dụng (Integrated/Dedicated POR):** Mạch này sử dụng các IC chuyên biệt dùng để giám sát nguồn điện (Reset IC hoặc Voltage Detector). Các IC này thường có ngưỡng điều chỉnh và chức năng trễ để phù hợp với các nhu cầu ứng dụng khác nhau. Chúng có độ chính xác cao, khả năng chống nhiễu tốt và hoạt động độc lập với vi xử lý, nên các vi điều khiển có tính năng reset thường cần kết hợp với các IC này. Vì Ví dụ, trong các thiết bị ô tô, thiết bị công nghiệp và các thiết bị khác yêu cầu mức độ an toàn cao, việc giám sát điện áp chỉ dựa vào vi điều khiển có thể không phải lúc nào cũng đủ.

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\UsingResetICToMonitorPowerSupplyVoltage.png"
  />
  <figcaption>Sử dụng Reset IC để giám sát điện áp nguồn</figcaption>
</figure>

## 6.2. Phân loại theo số lượng nguồn giám sát

- **Nguồn đơn (Single-supply):** Chỉ giám sát một đường nguồn duy nhất, phù hợp cho các thiết kế đơn giản,.

- **Đa nguồn (Multi-supply):** Có khả năng giám sát đồng thời hai, ba hoặc bốn mức điện áp khác nhau. Loại này đảm bảo rằng tất cả các đường nguồn cần thiết (ví dụ: nguồn I/O và nguồn lõi) đều đã ổn định trước khi giải phóng reset,.

## 6.3. Phân loại theo đặc tính ngưỡng điện áp

- **Ngưỡng cố định (Fixed Threshold):** Mức điện áp kích hoạt được nhà sản xuất thiết lập sẵn.

- **Ngưỡng có thể điều chỉnh (Adjustable Threshold):** Cho phép người thiết kế thiết lập mức điện áp mong muốn thông qua các điện trở bên ngoài, giúp tối ưu hóa sự ổn định và hiệu suất cho các mạch thử nghiệm.

## 6.4. Phân loại theo tính năng bổ sung

- **Mạch Reset thủ công (Manual Reset):** Mạch này bao gồm các nút nhấn, công tắc hoặc các thành phần đầu vào thủ công khác, cho phép người dùng kích hoạt quá trình reset theo cách thủ công. Nó thường được sử dụng để khắc phục sự cố (troubleshooting), gỡ lỗi hệ thống (system debugging) và trong quá trình phát triển, rất hữu ích khi hệ thống bị treo.

- **Giám sát Watchdog (Watchdog Timer):** Tích hợp bộ định thời để giám sát các tín hiệu quan trọng hoặc tình trạng sức khỏe của phần cứng, tự động reset nếu không nhận được tín hiệu định kỳ từ hệ thống.

- **Cảnh báo lỗi nguồn (Power-fail/Low-line Signals):** Một số mạch POR hoặc IC giám sát điện áp cung cấp thêm các input cho phép chúng giám sát các nguồn điện khác ngoài điện áp nguồn (ví dụ: nguồn điện dự phòng trong các máy chủ quan trọng). Điều này có thể giúp chúng phát hiện các lỗi tiềm ẩn trong các hệ thống điện khác, như sắp hỏng hoặc sụt áp (brownout); và thực hiện các biện pháp, chẳng hạn như sao lưu dữ liệu quan trọng, kích hoạt chuyển đổi hệ thống hoặc dừng hệ thống, trước khi xảy ra lỗi nghiêm trọng.

- **Trình tự và Theo dõi (Sequencing/Tracking):** Các mạch này điều phối thứ tự cấp nguồn hoặc thứ tự thoát reset giữa các linh kiện khác nhau trong hệ thống để tránh tình trạng chốt (latch-up) hoặc lỗi khởi tạo.

## 6.5. Phân loại theo đặc tính định thời

- **Không trễ (No delay):** Tín hiệu reset thay đổi trạng thái ngay khi điện áp đạt ngưỡng.

- **Có độ trễ (With Delay):** Sử dụng bộ định thời nội bộ hoặc bên ngoài để duy trì tín hiệu reset thêm một khoảng thời gian sau khi nguồn đã đạt ngưỡng, giúp nguồn điện hoàn toàn ổn định trước khi vi xử lý bắt đầu chạy. Thời gian trễ có thể được cấu hình dựa trên yêu cầu của hệ thống và thường được thực hiện bằng cách sử dụng mạng điện trở - tụ điện (RC).

---

# 7. Phân biệt Power-On Reset và System reset

**Power-On Reset:** Về bản chất, **Power-On Reset (PoR)** là một dạng Hardware reset. Cơ chế này hoạt động dựa trên các mạch điện giám sát mức điện áp và giữ hệ thống ở trạng thái reset cho đến khi các mức này đạt ngưỡng phù hợp. Ngoài việc tự động kích hoạt khi có điện, reset phần cứng còn có thể bị kích hoạt bởi các điều kiện ngoại cảnh khác như nhấn nút reset thủ công hoặc các tín hiệu từ bộ định thời watchdog khi phát hiện lỗi vật lý nghiêm trọng.

**System reset:** Khác với PoR, một **System reset**,  thường gọi là Software reset / Soft reset, là một quy trình hoặc chuỗi sự kiện kích hoạt việc khởi động lại hệ thống thông qua mã lệnh. Điểm khác biệt lớn nhất là reset mềm có thể được thực hiện ngay cả khi **không có lỗi phần cứng** hoặc không có điều kiện kích hoạt vật lý nào tồn tại. Một ví dụ điển hình của reset mềm là tổ hợp phím **Ctrl-Alt-Del** trên hệ điều hành Windows. Trong trường hợp này, người dùng chủ động yêu cầu hệ thống khởi động lại, và quy trình này có thể yêu cầu sự xác nhận thủ công của người dùng trước khi hoàn tất.

Tóm lại, trong khi **Power-On Reset (PoR)** là một cơ chế bảo vệ tự động và bắt buộc của mạch điện để đảm bảo tính toàn vẹn vật lý, thì **System reset** là một công cụ quản trị hệ thống linh hoạt để khôi phục trạng thái hoạt động mà không cần can thiệp vào nguồn điện.


---

# Tham khảo

[1] [Vemeko, "All about Power-on Reset"](https://www.vemeko.com/blog/all-about-power-on-reset.html)

[2] [ABOV Semiconductor, "GUIDE OF POWER ON RESET"](https://www.keil.com/dd/docs/datashts/abov/an26_power_on_reset_v1_0.pdf)

[3] [HardwareBee, "Introduction to Power-on-Reset"](https://hardwarebee.com/introduction-to-power-on-reset-circuit/)

[4] [Analog Devices, "Power-On Reset and Related Supervisory Functions"](https://www.analog.com/jp/resources/technical-articles/poweron-reset-and-related-supervisory-functions.html)

[5] [TechTarget, "power-on reset (PoR)"](https://www.techtarget.com/whatis/definition/power-on-reset-PoR)

[6] [Microchip Technology, "12.3.2.1.1 Power-on Reset (POR)"](https://onlinedocs.microchip.com/oxy/GUID-F0E44D22-01FD-4672-8F9F-301992D3E816-en-US-7/GUID-C16C9F93-FCB7-40AF-82E3-88C606AF873C.html)

[7] [ABLIC, "Introduction - What is a Reset IC?"](https://www.ablic.com/en/semicon/products/power-management-ic/voltage-detector-reset-ic/intro/)

[8] [AllPCB, "Power-On Reset Circuit Devices & Types"](https://www.allpcb.com/allelectrohub/poweron-reset-circuit-devices-and-types)

[9] [Keil, "GUIDE OF POWER ON RESET - AN0026 - Ver 1.0"](https://www.keil.com/dd/docs/datashts/abov/an26_power_on_reset_v1_0.pdf)

[10] [Microchip Technology, "PIC24F FRM Section 7. Reset (DS39712D).pdf"](https://www.microchip.com.tw/RTC/RTC_DVD/Reference%20Manuals/16-Bits%20Family%20Reference%20Manual/PIC24F%20FRM%20Section%207.%20Reset%20%28DS39712D%29.pdf?utm_source=chatgpt.com)

<!-- 
Cần tìm hiểu thêm:
https://www.electronicsforu.com/technology-trends/powering-ics-off-part-1-power-reset
https://www.analog.com/en/resources/analog-dialogue/articles/powering-ics-on-and-off.html?utm_source=chatgpt.com
https://www.youtube.com/watch?v=QAEUu1lH87E&pp=ygUXcG93ZXItb24gcmVzZXQgZXhwbGFpbmU%3D
 -->

---
title: Cache
parent: Embedded Systems Architecture
nav_order: 8
---

<h1>Cache</h1>

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# Cache là gì?

## Cache là gì?

**Cache** là phần cứng hoặc phần mềm được dùng để **lưu trữ tạm thời dữ liệu** trong môi trường máy tính.

Cache thường là một vùng nhớ nhỏ, có tốc độ truy cập rất nhanh, chi phí cao hơn bộ nhớ thông thường.

Cache được sử dụng để tăng hiệu năng khi truy cập những dữ liệu vừa mới được sử dụng hoặc được truy cập thường xuyên (bộ nhớ đệm).

Dữ liệu trong cache được lưu tạm thời tại một vùng lưu trữ dễ truy cập, nằm gần nơi sử dụng dữ liệu (cache client) và tách biệt với bộ nhớ lưu trữ chính.

Cache được sử dụng phổ biến trong:
- CPU (Central Processing Unit).
- Ứng dụng / applications.
- Trình duyệt web / web browsers.
- Hệ điều hành / Operating Systems (OS).

<!-- 
Tại sao cache lại có chi phí cao hơn RAM hoặc storage thông thường?
Sự khác nhau giữa cache và buffer là gì?
Điều gì xảy ra nếu hệ thống hoàn toàn không sử dụng cache?
-->

<details markdown="block">
<summary><i>Tại sao cache lại có chi phí cao hơn RAM hoặc storage thông thường?</i></summary>

> Cache có chi phí cao hơn vì nó được thiết kế để đạt tốc độ truy cập cực nhanh. Để làm được điều này, cache thường sử dụng các công nghệ bộ nhớ đắt tiền hơn và có cấu trúc phần cứng phức tạp hơn.
>
> Ví dụ:
> - CPU cache thường sử dụng <strong>SRAM (Static RAM)</strong>.
> - Bộ nhớ chính (RAM thông thường) thường sử dụng <strong>DRAM (Dynamic RAM)</strong>.
> - Storage như SSD/HDD sử dụng <strong>flash memory</strong> hoặc <strong>magnetic storage</strong>.
>
> <strong>SRAM nhanh hơn DRAM rất nhiều</strong> vì SRAM không cần refresh liên tục, có độ trễ cực thấp, và có thể hoạt động gần tốc độ CPU.
>
> Tuy nhiên, SRAM chiếm nhiều transistor hơn cho mỗi bit dữ liệu, tiêu thụ diện tích chip lớn hơn, và có giá thành sản xuất cao hơn.
>
> Ngoài ra, cache thường được đặt rất gần CPU hoặc tích hợp trực tiếp bên trong CPU để giảm độ trễ. Điều này làm tăng:
> - Độ phức tạp thiết kế.
> - Chi phí sản xuất chip.
> - Mức tiêu thụ điện năng.
> - Yêu cầu tản nhiệt.
>
> Vì lý do chi phí, cache thường có dung lượng nhỏ nhưng rất nhanh, trong khi RAM và storage có dung lượng lớn hơn nhưng chậm hơn.
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Sự khác nhau giữa cache và buffer là gì?</i></summary>

> Cache và buffer đều là vùng nhớ tạm, nhưng mục đích sử dụng khác nhau.
> <table class="hover-table">
>   <thead>
>     <tr>
>      <th>Cache</th>
>      <th>Buffer</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>      <td>Dùng để tăng tốc truy cập dữ liệu</td>
>      <td>Dùng để đồng bộ tốc độ truyền dữ liệu</td>
>     </tr>
>     <tr>
>      <td>Lưu dữ liệu được truy cập thường xuyên</td>
>      <td>Lưu dữ liệu tạm thời trong quá trình truyền</td>
>     </tr>
>     <tr>
>      <td>Tập trung giảm độ trễ</td>
>      <td>Tập trung tránh nghẽn hoặc mất dữ liệu</td>
>     </tr>
>     <tr>
>      <td>Dữ liệu có thể được tái sử dụng nhiều lần</td>
>      <td>Dữ liệu thường chỉ đi qua một lần</td>
>     </tr>
>     <tr>
>      <td>Ví dụ: CPU cache, browser cache</td>
>      <td>Ví dụ: keyboard buffer, audio buffer</td>
>     </tr>
>   </tbody>
> </table>
>
> Ví dụ:
> - <strong>Cache</strong>: Khi mở lại một website, trình duyệt lấy ảnh từ cache thay vì tải lại từ Internet.
> - <strong>Buffer</strong>: Khi xem video online, vài giây dữ liệu video được tải trước vào buffer.
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Điều gì xảy ra nếu hệ thống hoàn toàn không sử dụng cache?</i></summary>

> Nếu hệ thống không có cache, mọi thao tác truy cập dữ liệu đều phải đi trực tiếp tới bộ nhớ chính hoặc storage. Điều này gây ra nhiều vấn đề lớn về hiệu năng.
> 
> Một số hậu quả chính:
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Hậu quả</th>
>       <th>Mô tả</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td>CPU phải chờ RAM liên tục</td>
>       <td>CPU hiện đại nhanh hơn RAM rất nhiều.<br>Không có cache sẽ làm CPU bị idle trong lúc đợi dữ liệu.</td>
>     </tr>
>     <tr>
>       <td>Tăng độ trễ hệ thống</td>
>       <td>Website tải chậm hơn.<br>Ứng dụng phản hồi chậm hơn.<br>Database query mất nhiều thời gian hơn.</td>
>     </tr>
>     <tr>
>       <td>Tăng số lượng I/O tới storage.</td>
>       <td>SSD/HDD bị truy cập liên tục.<br>Tăng bottleneck I/O.</td>
>     </tr>
>     <tr>
>       <td>Tăng tiêu thụ điện năng.</td>
>       <td>Storage và network phải hoạt động nhiều hơn.<br>CPU phải chờ lâu hơn để hoàn thành công việc.</td>
>     </tr>
>     <tr>
>       <td>Giảm scalability.</td>
>       <td>Hệ thống chịu tải kém hơn.<br>Traffic lớn dễ làm server quá tải.</td>
>     </tr>
>   </tbody>
> </table>
>
> <i>Scalability là khả năng của hệ thống có thể xử lý khối lượng công việc hoặc số lượng người dùng tăng lên mà vẫn duy trì hiệu năng và độ ổn định.</i>
>
> Ví dụ: Nếu browser không có cache, mỗi lần mở website sẽ phải tải lại toàn bộ: ảnh, CSS, JavaScript, font. Kết quả là web chậm hơn, tốn băng thông hơn.
{: .codeBlock }
</details>

## Tại sao cần cache?

Bộ nhớ chính hoặc thiết bị lưu trữ chính thường không đủ nhanh để đáp ứng liên tục các yêu cầu truy cập dữ liệu từ hệ thống hoặc người dùng.

Cache giúp:
- Giảm thời gian truy cập dữ liệu.
- Giảm độ trễ (latency).
- Cải thiện hiệu năng I/O.

Vì hầu hết các ứng dụng đều phụ thuộc vào các thao tác I/O, nên cơ chế cache giúp tăng đáng kể hiệu năng tổng thể của ứng dụng.

<!-- 
Vì sao I/O thường trở thành bottleneck của hệ thống?
Trong trường hợp nào cache không cải thiện hiệu năng đáng kể? 
-->


<details markdown="block">
<summary><i>Vì sao I/O thường trở thành bottleneck của hệ thống?</i></summary>

> ___
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Trong trường hợp nào cache không cải thiện hiệu năng đáng kể?</i></summary>

> ___
{: .codeBlock }
</details>

---

# Cache hoạt động như thế nào?

Khi một thành phần trong hệ thống cần truy cập dữ liệu, nó sẽ kiểm tra cache trước tiên. Nếu dữ liệu đã tồn tại trong cache thì trường hợp này được gọi là **cache hit**. Tỷ lệ số lần truy cập tìm thấy dữ liệu trong cache so với tổng số lần truy cập được gọi là **cache hit rate** (hoặc **cache hit ratio**).


Nếu dữ liệu cần truy cập không có trong cache thì xảy ra **cache miss**. Khi đó, dữ liệu sẽ được lấy từ bộ nhớ chính rồi sao chép vào cache để phục vụ cho các lần truy cập sau. Cách thức đưa dữ liệu vào cache và loại bỏ dữ liệu cũ để tạo chỗ trống phụ thuộc vào thuật toán cache, giao thức cache và chính sách của hệ thống.

$$
\text{Cache hit ratio}
=
\frac{\text{Number of cache hits}}
{(\text{Number of cache hits}) + (\text{Number of cache misses})}
=
1 - (\text{Miss ratio})
$$

Các trình duyệt web như Safari, Mozilla Firefox và Google Chrome sử dụng cơ chế browser cache để tăng tốc độ truy cập các trang web được sử dụng thường xuyên. Khi người dùng mở một trang web, các tệp cần thiết sẽ được lưu tạm vào cache trên thiết bị của người dùng.

Khi truy cập lại trang web đó, trình duyệt sẽ lấy phần lớn dữ liệu trực tiếp từ cache thay vì yêu cầu web server gửi lại toàn bộ dữ liệu. Cách tiếp cận này được gọi là **read cache**. Việc đọc dữ liệu từ cache nhanh hơn đáng kể so với tải lại dữ liệu từ trang web qua mạng.

## Vì sao cache quan trọng?

Cache có vai trò quan trọng vì nhiều lý do:

- Cache giúp giảm độ trễ khi truy cập dữ liệu đang hoạt động, từ đó cải thiện hiệu năng của hệ thống hoặc ứng dụng.

- Cache chuyển hướng các thao tác I/O sang vùng cache, giúp giảm số lượng thao tác I/O tới thiết bị lưu trữ ngoài hoặc các tầng thấp hơn của hệ thống storage area network.

- Dữ liệu vẫn có thể được lưu lâu dài trong các hệ thống lưu trữ truyền thống hoặc storage array bên ngoài. Điều này giúp duy trì tính nhất quán và toàn vẹn dữ liệu thông qua các tính năng như snapshot và replication do hệ thống lưu trữ cung cấp.

- Bộ nhớ flash chỉ được sử dụng cho phần workload thực sự cần độ trễ thấp. Cách này giúp tối ưu chi phí khi sử dụng các loại bộ nhớ tốc độ cao nhưng đắt tiền.

<!-- 
Snapshot và replication liên quan gì đến việc bảo vệ dữ liệu gốc?
Vì sao flash storage thường chỉ được dùng cho workload cần độ trễ thấp?
Cache có ảnh hưởng như thế nào tới scalability của hệ thống?
 -->


<details markdown="block">
<summary><i>Snapshot và replication liên quan gì đến việc bảo vệ dữ liệu gốc?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Vì sao flash storage thường chỉ được dùng cho workload cần độ trễ thấp?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Cache có ảnh hưởng như thế nào tới scalability của hệ thống?</i></summary>

> ___
{: .codeBlock }
</details>

## Cache memory trong phần cứng

Cache memory thường được tích hợp trực tiếp trong CPU hoặc được gắn trên chip của system board. Đối với các hệ thống hiện đại, việc tăng dung lượng cache thường chỉ có thể thực hiện bằng cách nâng cấp CPU và system board lên thế hệ mới hơn. Một số system board đời cũ có thể có các khe cắm trống cho phép mở rộng thêm cache memory.

<!-- 
Vì sao cache memory thường được đặt rất gần CPU?
Cache memory ảnh hưởng thế nào đến pipeline của CPU?
Sự khác nhau giữa CPU cache và RAM là gì?
Vì sao nâng cấp cache trên hệ thống hiện đại thường khó hơn trước đây?
 -->


<details markdown="block">
<summary><i>Vì sao cache memory thường được đặt rất gần CPU?</i></summary>

> ___
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Cache memory ảnh hưởng thế nào đến pipeline của CPU?</i></summary>

> ___
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Sự khác nhau giữa CPU cache và RAM là gì?</i></summary>

> ___
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Vì sao CPU cần cache riêng thay vì chỉ sử dụng RAM?</i></summary>

> ___
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Vì sao nâng cấp cache trên hệ thống hiện đại thường khó hơn trước đây?</i></summary>

> ___
{: .codeBlock }
</details>
---

# Cache được sử dụng như thế nào?

Cache được dùng để lưu trữ tạm thời các tệp hoặc dữ liệu thông qua cả phần cứng và phần mềm.

Một ví dụ về hardware cache là cache của CPU. Đây là một vùng nhớ nhỏ nằm trên bộ xử lý của máy tính, được dùng để lưu các lệnh cơ bản đã được sử dụng gần đây hoặc được sử dụng thường xuyên. Nhờ đó, CPU có thể truy cập dữ liệu nhanh hơn thay vì phải đọc lại từ bộ nhớ chính.

Nhiều ứng dụng và phần mềm cũng có cache riêng. Loại cache này dùng để lưu tạm thời dữ liệu, tệp hoặc các chỉ thị liên quan đến ứng dụng nhằm giúp việc truy xuất dữ liệu diễn ra nhanh hơn.

Trình duyệt web là một ví dụ điển hình của application caching. Các trình duyệt lưu lại dữ liệu từ những phiên duyệt web trước để sử dụng cho các lần truy cập sau. Ví dụ, khi người dùng xem lại một video trên YouTube, video có thể được tải nhanh hơn vì trình duyệt lấy dữ liệu từ cache đã lưu trước đó thay vì tải lại hoàn toàn từ Internet.

Các loại phần mềm khác cũng sử dụng cache gồm có:

- Hệ điều hành: các lệnh và tệp được sử dụng thường xuyên sẽ được lưu lại để truy cập nhanh hơn.

- Mạng phân phối nội dung (Content Delivery Network - CDN): dữ liệu được cache ở phía server nhằm tăng tốc độ tải website.

- Hệ thống phân giải tên miền (Domain Name System - DNS): cache được dùng để lưu thông tin ánh xạ giữa tên miền (domain names) và địa chỉ IP (Internet Protocol addresses).

- Database: cache giúp giảm độ trễ khi thực hiện các truy vấn dữ liệu (database query).

<!-- 
Hardware cache và software cache khác nhau ở điểm nào?
Browser cache lưu những loại dữ liệu nào?
CDN cache giúp tăng tốc website bằng cách nào?
DNS cache giúp giảm thời gian truy cập website ra sao?
 -->


<details markdown="block">
<summary><i>Hardware cache và software cache khác nhau ở điểm nào?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Browser cache lưu những loại dữ liệu nào?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>CDN cache giúp tăng tốc website bằng cách nào?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>DNS cache giúp giảm thời gian truy cập website ra sao?</i></summary>

> ___
{: .codeBlock }
</details>


---

# Lợi ích và Nhược điểm

## Lợi ích của cache

Cache mang lại nhiều lợi ích quan trọng, bao gồm:

- **Hiệu năng (Performance):** Việc lưu dữ liệu trong cache giúp hệ thống hoạt động nhanh hơn. *Ví dụ, browser cache lưu lại dữ liệu từ các phiên duyệt web trước giúp tăng tốc độ truy cập ở các lần sử dụng tiếp theo*. Database cache cũng giúp truy xuất dữ liệu nhanh hơn thay vì phải tốn nhiều thời gian và tài nguyên để tải lại dữ liệu từ nguồn chính.

- **Làm việc ngoại tuyến (Offline work):** Cache cho phép một số ứng dụng tiếp tục hoạt động ngay cả khi không có kết nối Internet. Application cache cung cấp khả năng truy cập nhanh tới các dữ liệu đã được sử dụng gần đây hoặc được dùng thường xuyên. Tuy nhiên, cache có thể không hỗ trợ đầy đủ mọi chức năng của ứng dụng khi offline.

- **Tối ưu tài nguyên (Resource efficiency):** Ngoài việc tăng tốc độ và tính linh hoạt, cache còn giúp thiết bị tiết kiệm tài nguyên phần cứng. Ví dụ, việc truy cập dữ liệu nhanh từ cache giúp giảm mức tiêu thụ pin của thiết bị.

<!-- 
Offline cache hoạt động như thế nào khi không có Internet?
Database cache giúp tối ưu query bằng cách nào?
Cache có thể giúp tiết kiệm pin trên thiết bị di động ra sao?
Vì sao cache đặc biệt quan trọng với hệ thống realtime?
 -->


<details markdown="block">
<summary><i>Offline cache hoạt động như thế nào khi không có Internet?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Database cache giúp tối ưu query bằng cách nào?</i></summary>

> ___
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Cache có thể giúp tiết kiệm pin trên thiết bị di động ra sao?</i></summary>

> ___
{: .codeBlock }
</details>

<details markdown="block">
<summary><i>Vì sao cache đặc biệt quan trọng với hệ thống realtime?</i></summary>

> ___
{: .codeBlock }
</details>




## Nhược điểm của cache

Cache cũng tồn tại một số vấn đề và hạn chế, bao gồm:

- **Hỏng dữ liệu (Corruption):** Cache có thể bị lỗi hoặc bị hỏng, khiến dữ liệu lưu trong cache không còn chính xác hoặc không còn sử dụng được. Điều này có thể làm ứng dụng như trình duyệt bị crash hoặc hiển thị sai dữ liệu.

- **Ảnh hưởng hiệu năng (Performance):** Cache thường chỉ là vùng nhớ tạm có dung lượng nhỏ. Nếu cache trở nên quá lớn, hiệu năng hệ thống có thể giảm xuống. Ngoài ra, cache cũng chiếm dụng bộ nhớ mà các ứng dụng khác có thể cần sử dụng, từ đó ảnh hưởng tiêu cực tới hiệu năng tổng thể.

- **Thông tin lỗi thời (Outdated information):** Đôi khi cache hiển thị dữ liệu cũ hoặc không còn cập nhật. Điều này có thể gây lỗi ứng dụng hoặc trả về thông tin sai lệch. *Ví dụ, nếu một website hoặc ứng dụng đã được cập nhật trên Internet nhưng trình duyệt vẫn sử dụng dữ liệu cache từ phiên trước, người dùng sẽ không thấy nội dung mới nhất*. Vấn đề này đặc biệt ảnh hưởng tới dữ liệu động (dynamic content) thay đổi thường xuyên giữa các phiên làm việc.

<!-- 
Điều gì có thể gây ra cache corruption?
Vì sao cache quá lớn đôi khi lại làm giảm hiệu năng?
Dữ liệu stale cache có thể gây ra hậu quả gì?
Vì sao dynamic content dễ gặp vấn đề với cache hơn static content?
Làm thế nào để đảm bảo tính nhất quán giữa cache và dữ liệu gốc?
 -->


<details markdown="block">
<summary><i>Điều gì có thể gây ra cache corruption?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Vì sao cache quá lớn đôi khi lại làm giảm hiệu năng?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Dữ liệu stale cache có thể gây ra hậu quả gì?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Vì sao dynamic content dễ gặp vấn đề với cache hơn static content?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Làm thế nào để đảm bảo tính nhất quán giữa cache và dữ liệu gốc?</i></summary>

> ___
{: .codeBlock }
</details>

---

# Thuật toán cache

Các thuật toán cache cung cấp cơ chế quản lý và duy trì dữ liệu trong cache. Một số thuật toán phổ biến gồm:

- **Least Frequently Used (LFU):** Thuật toán này theo dõi số lần mỗi dữ liệu trong cache được truy cập. Dữ liệu có số lần truy cập thấp nhất sẽ bị loại bỏ trước.

- **Least Recently Used (LRU):** Thuật toán này ưu tiên giữ lại những dữ liệu vừa được truy cập gần đây. Khi cache đầy, dữ liệu lâu không được sử dụng nhất sẽ bị loại bỏ.

- **Most Recently Used (MRU):** Thuật toán này loại bỏ dữ liệu vừa được truy cập gần nhất trước tiên. Cách tiếp cận này phù hợp trong trường hợp dữ liệu cũ có khả năng được sử dụng lại cao hơn dữ liệu mới.


<!-- 
Điểm khác nhau chính giữa LFU, LRU và MRU là gì?
Trong trường hợp nào LRU hoạt động hiệu quả hơn LFU?
Vì sao MRU phù hợp khi dữ liệu cũ có khả năng được truy cập lại cao?
Thuật toán cache ảnh hưởng thế nào đến cache hit ratio?
Các hệ thống thực tế thường kết hợp nhiều thuật toán cache như thế nào?
 -->


<details markdown="block">
<summary><i>Điểm khác nhau chính giữa LFU, LRU và MRU là gì?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Trong trường hợp nào LRU hoạt động hiệu quả hơn LFU?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Vì sao MRU phù hợp khi dữ liệu cũ có khả năng được truy cập lại cao?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Thuật toán cache ảnh hưởng thế nào đến cache hit ratio?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Các hệ thống thực tế thường kết hợp nhiều thuật toán cache như thế nào?</i></summary>

> ___
{: .codeBlock }
</details>


---

# Chính sách cache

Các chính sách cache (Cache policies) quyết định cách cache hoạt động và xử lý dữ liệu. Một số chính sách phổ biến gồm:

- **Write-around cache:** Dữ liệu được ghi trực tiếp xuống thiết bị lưu trữ mà không đi qua cache. Cách này giúp tránh tình trạng cache bị lấp đầy khi có số lượng lớn thao tác ghi I/O. Tuy nhiên, nhược điểm là dữ liệu sẽ không được lưu trong cache nếu chưa từng được đọc từ storage. Vì vậy, lần đọc đầu tiên sẽ chậm hơn do dữ liệu chưa có trong cache.

- **Write-through cache:** Dữ liệu được ghi đồng thời vào cả cache và storage. Ưu điểm của phương pháp này là dữ liệu mới luôn tồn tại trong cache nên có thể được đọc lại nhanh chóng. Tuy nhiên, thao tác ghi chỉ được xem là hoàn tất khi dữ liệu đã được ghi thành công vào cả cache và bộ nhớ chính, điều này có thể làm tăng độ trễ của thao tác ghi.

- **Write-back cache:** Cơ chế này cũng ghi dữ liệu vào cache trước giống write-through cache. Tuy nhiên, thao tác ghi được xem là hoàn tất ngay sau khi dữ liệu được lưu vào cache. Sau đó, dữ liệu mới được sao chép từ cache xuống storage. Với phương pháp này, cả thao tác đọc và ghi đều có độ trễ thấp. Tuy nhiên, dữ liệu vẫn có nguy cơ bị mất nếu hệ thống gặp sự cố trước khi dữ liệu được ghi hoàn toàn xuống storage.

<!-- 
Khi nào nên sử dụng write-around cache?
Chính sách cache ảnh hưởng thế nào đến data consistency?
Nếu hệ thống mất điện khi dùng write-back cache thì điều gì có thể xảy ra?
 -->


<details markdown="block">
<summary><i>Khi nào nên sử dụng write-around cache?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Chính sách cache ảnh hưởng thế nào đến data consistency?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Nếu hệ thống mất điện khi dùng write-back cache thì điều gì có thể xảy ra?</i></summary>

> ___
{: .codeBlock }
</details>

---

# Xóa cache

## Xóa cache có tác dụng gì?

Việc xóa cache giúp giải phóng bộ nhớ trên thiết bị. Browser cache sử dụng bộ nhớ để lưu các tệp được tải từ Internet. Xóa cache có thể giúp giải quyết một số vấn đề như:

- Cache đầy có thể làm ứng dụng bị crash hoặc hoạt động không đúng cách.

- Cache cũ có thể chứa dữ liệu hoặc tệp lỗi thời, khiến trang web tải sai hoặc không tải được. Việc xóa cache giúp loại bỏ những dữ liệu cũ này.

- Browser cache cũng có thể lưu thông tin cá nhân như mật khẩu. Xóa cache giúp tăng tính bảo mật cho người dùng.

- Hầu hết các trình duyệt đều cho phép xóa cache thông qua phần cài đặt.

<!--
Sự khác nhau giữa xóa cache và xóa cookie là gì?
-->


<details markdown="block">
<summary><i>Sự khác nhau giữa xóa cache và xóa cookie là gì?</i></summary>

> ___
{: .codeBlock }
</details>


## Nên thực hiện xóa cache bao lâu một lần?

Cache nên được xóa định kỳ nhưng không cần thực hiện hằng ngày. Việc xóa cache quá thường xuyên không hiệu quả vì các lý do sau:

- Người dùng sẽ mất lợi ích truy cập nhanh vào các tệp đã được lưu trong cache.

- Cache tự động xóa một số tệp theo cơ chế riêng nên không cần bảo trì quá thường xuyên.

- Sau khi xóa, hệ thống sẽ tiếp tục tạo cache mới và sử dụng lại dung lượng bộ nhớ đó.

## Cách xóa Browser cache

**Browser cache** là loại cache mà người dùng phổ thông thường gặp nhất. Trong hầu hết trường hợp, cache có thể được xóa thông qua menu Settings hoặc Preferences của trình duyệt. Những khu vực này thường cũng chứa các tùy chọn liên quan đến quyền riêng tư, cookie và lịch sử duyệt web. Người dùng có thể xóa hoặc thay đổi các thiết lập từ đây.

Nhiều trình duyệt trên máy tính hỗ trợ phím tắt để mở nhanh menu xóa cache:
- Trên Microsoft Windows, nhấn `Ctrl + Shift + Delete`.
- Trên macOS của Apple, nhấn `Command + Shift + Delete`.

Các phím tắt này sẽ mở menu cài đặt liên quan đến việc xóa dữ liệu duyệt web. Giao diện có thể khác nhau tùy theo trình duyệt.

<details markdown="block">
<summary><i>Cách xóa cache trên Google Chrome</i></summary>

> 1. Nhấn `Ctrl + Shift + Delete` trên Windows hoặc `Command + Shift + Delete` trên Mac.
> 1. Cuộn đến mục “Privacy and security”.
> 1. Chọn “Clear browsing data”.
> 1. Chọn khoảng thời gian cần xóa hoặc chọn “All time” để xóa toàn bộ cache.
> 1. Đánh dấu mục “Cached images and files”.
> 1. Nhấn “Clear data”.
{: .codeBlock }
</details>

---

# Các loại cache

Cache được sử dụng cho nhiều mục đích khác nhau. Một số loại cache phổ biến gồm:

1. **Cache memory:** Đây là vùng RAM mà microprocessor có thể truy cập nhanh hơn RAM thông thường. Cache memory thường được gắn trực tiếp với CPU và được dùng để lưu các lệnh được truy cập thường xuyên. RAM cache nhanh hơn cache dựa trên ổ đĩa (disk-based cache), nhưng cache memory còn nhanh hơn cả RAM cache do nằm rất gần CPU.

1. **CPU cache:** Đây là vùng nhớ nhỏ nằm trực tiếp trên CPU. Bộ nhớ này hoạt động ở tốc độ của CPU thay vì tốc độ của system bus nên nhanh hơn RAM rất nhiều.

1. **RAM cache:** RAM cache thường bao gồm bộ nhớ cố định được tích hợp trên bo mạch chủ và các module bộ nhớ có thể cắm thêm vào các khe mở rộng. Mainboard bus cung cấp khả năng truy cập tới vùng nhớ này. CPU cache memory có thể nhanh hơn RAM từ 10 đến 100 lần và chỉ cần vài nanosecond để phản hồi yêu cầu từ CPU. Trong khi đó, RAM cache vẫn có thời gian phản hồi nhanh hơn rất nhiều so với các thiết bị lưu trữ từ tính vốn xử lý I/O ở mức millisecond.

1. **Disk cache:** Loại cache này lưu dữ liệu vừa được đọc gần đây và đôi khi lưu thêm các vùng dữ liệu lân cận có khả năng sẽ được truy cập tiếp theo. Một số disk cache quản lý dữ liệu dựa trên tần suất truy cập. Những block dữ liệu được đọc thường xuyên được gọi là **hot blocks** và sẽ tự động được đưa vào cache.

1. **Flash cache:** Còn được gọi là solid-state drive caching, loại cache này sử dụng chip nhớ NAND flash để lưu tạm dữ liệu. Flash cache phản hồi yêu cầu dữ liệu nhanh hơn nhiều so với cache đặt trên ổ cứng HDD truyền thống hoặc trong backing store.

1. **Persistent cache:** Đây là vùng lưu trữ cache mà dữ liệu không bị mất khi hệ thống reboot hoặc crash. Persistent cache thường sử dụng pin dự phòng hoặc ghi dữ liệu vào dynamic RAM có pin backup để tăng khả năng bảo vệ dữ liệu.

1. **Translation Lookaside Buffer (TLB):** Đây là một loại memory cache dùng để lưu các kết quả ánh xạ gần đây từ địa chỉ bộ nhớ ảo sang địa chỉ vật lý, giúp tăng tốc các thao tác liên quan đến virtual memory.

1. **Cache server (proxy cache):** Đây là một server hoặc dịch vụ mạng chuyên dụng dùng để lưu cục bộ các trang web hoặc nội dung Internet khác nhằm tăng tốc độ truy cập.

<!--
Điểm khác nhau giữa CPU cache, RAM cache và disk cache là gì?
Vì sao CPU cache nhanh hơn RAM rất nhiều?
Hot blocks trong disk cache được xác định như thế nào?
Flash cache có ưu điểm gì so với HDD-based cache?
Translation Lookaside Buffer (TLB) giúp tăng tốc virtual memory bằng cách nào?
Persistent cache bảo vệ dữ liệu khi crash hệ thống ra sao?
Cache server khác gì so với browser cache?
Vì sao RAM cache có thời gian phản hồi nhanh hơn magnetic storage?
-->



<details markdown="block">
<summary><i>Điểm khác nhau giữa CPU cache, RAM cache và disk cache là gì?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Vì sao CPU cache nhanh hơn RAM rất nhiều?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Hot blocks trong disk cache được xác định như thế nào?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Flash cache có ưu điểm gì so với HDD-based cache?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Translation Lookaside Buffer (TLB) giúp tăng tốc virtual memory bằng cách nào?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Persistent cache bảo vệ dữ liệu khi crash hệ thống ra sao?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Cache server khác gì so với browser cache?</i></summary>

> ___
{: .codeBlock }
</details>


<details markdown="block">
<summary><i>Vì sao RAM cache có thời gian phản hồi nhanh hơn magnetic storage?</i></summary>

> ___
{: .codeBlock }
</details>

---

## Nguồn tham khảo

1. [Cache - TechTarget](https://www.techtarget.com/searchstorage/definition/cache)

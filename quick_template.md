bundle exec jekyll serve

==============================================================================================

[Complete list of github markdown emoji markup](https://gist.github.com/rxaviers/7360908#file-gistfile1-md)

Up arrow (↑): &uarr;
Down arrow (↓): &darr;
Left arrow (←): &larr;
Right arrow (→): &rarr;
Double headed arrow (↔): &harr;
==============================================================================================

{: .note }
{: .codeBlock }

==============================================================================================

[___]({{ "/docs/___" | relative_url }})

==============================================================================================

```c
____
```
https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference

==============================================================================================

<details markdown="block">
  <summary>Mục lục</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

==============================================================================================

<figure>
  <img
    src="{{ site.baseurl }}\assets\images\"
    style="width: 75%; height: auto;"
  />
  <figcaption>my_caption<br>
  Nguồn: <a href="link" target="_blank">caption_of_link</a>
  </figcaption>
</figure>

==============================================================================================

<div class="video-container">
  <video controls>
    <source src="{{ '/assets/videos/my_video.mp4' | relative_url }}" type="video/mp4">
  </video>
  <p class="video-caption">
  my_caption.<br>
  Nguồn: <a href="link" target="_blank">caption_of_link</a>
  </p>
</div>

==============================================================================================

<table class="hover-table">
  <thead>
    <tr>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<table class="hover-table">
  <thead>
    <tr>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>Item_1</li>
          <li>Item_2</li>
          <li>Item_3</li>
        </ul>
      </td>
      <td></td>
    </tr>
  </tbody>
</table>


==============================================================================================

<details markdown="block">
<summary><i>___</i></summary>

> ___
{: .codeBlock }
</details>

==============================================================================================

<details markdown="block">
<summary><i>___</i></summary>

> ___
> <table class="hover-table">
>   <thead>
>     <tr>
>       <th></th>
>       <th></th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr>
>       <td></td>
>       <td></td>
>     </tr>
>     <tr>
>       <td>
>         <ul>
>           <li>Item_1</li>
>           <li>Item_2</li>
>           <li>Item_3</li>
>         </ul>
>       </td>
>       <td></td>
>     </tr>
>   </tbody>
> </table>
{: .codeBlock }
</details>

==============================================================================================

# Prompt tạo bảng **Key Concepts**

Bạn hãy tạo một bảng HTML theo đúng format bên dưới để tóm tắt các khái niệm xuất hiện trong phần tài liệu.

## Yêu cầu

* Bảng gồm **2 cột**:

  * **Concept**: Chứa **thuật ngữ tiếng Anh**.
  * **Description**:
    * Bắt đầu bằng **tên tiếng Việt** của thuật ngữ.
    * Sau đó là dấu hai chấm và phần giải thích ngắn gọn, rõ ràng và chính xác bằng tiếng Việt (không bắt đầu bằng từ "là" và không in hoa chữ cái đầu tiên).
    * Nếu thuật ngữ có tên viết tắt, tên gọi khác hoặc nhiều cách gọi thì ghi trong ngoặc.
    * Nếu có phần mở rộng (ví dụ phần mở rộng file, cú pháp, ví dụ lệnh...) thì trình bày bằng thẻ `<code>`.
    * Nếu khái niệm có nhiều trường hợp hoặc phân loại (ví dụ Local Scope, Global Scope,...) thì sử dụng danh sách `<ul><li>` bên trong ô.
* Chỉ sử dụng HTML, **không sử dụng Markdown table**.
* Giữ nguyên cấu trúc `<details>` và class `hover-table`, `codeBlock`.
* Nội dung phải súc tích, phù hợp để làm bảng **Key Concepts** ở đầu mỗi mục trong tài liệu kỹ thuật.
* Không thêm lời mở đầu hay kết luận, chỉ trả về đoạn HTML hoàn chỉnh.

## Format

<details markdown="block">
<summary><i>Key Concepts</i></summary>

> <table class="hover-table">
>   <thead>
>     <tr>
>       <th>Concept</th>
>       <th>Description</th>
>     </tr>
>   </thead>
>   <tbody>
>     <!-- Thêm các khái niệm tại đây -->
>   </tbody>
> </table>
{: .codeBlock }
</details>

## Dữ liệu đầu vào


==============================================================================================

Prompt:

Tạo danh sách tài liệu tham khảo từ các URL bên dưới.

Yêu cầu:

1. Truy cập từng URL và xác định:
   * Tên website hoặc tác giả chính.
   * Tiêu đề bài viết.

2. Chuẩn hóa theo phong cách tài liệu kỹ thuật/academic với định dạng:
   [n] [Website/Tác giả, "Tiêu đề bài viết"](URL)

3. Kết quả phải:
   * Được đánh số thứ tự liên tục từ [1].
   * Sử dụng Markdown hyperlink.
   * Giữ nguyên URL gốc.
   * Chỉ hiển thị Website/Tác giả và Tiêu đề bài viết.
   * Không hiển thị ngày truy cập, ngày xuất bản, DOI hoặc thông tin bổ sung khác.
   * Tiêu đề bài viết phải giữ nguyên ngôn ngữ gốc.
   * Tên website/tác giả phải được chuẩn hóa để đồng nhất giữa các tài liệu tham khảo.

4. Xuất kết quả dưới dạng:
   [1] [Website/Tác giả, "Tiêu đề bài viết"](URL)
   [2] [Website/Tác giả, "Tiêu đề bài viết"](URL)
   ...

5. Ưu tiên tên website hơn tên tác giả cá nhân. Chỉ sử dụng tên tác giả khi website không thể xác định rõ nguồn xuất bản.

Danh sách URL:

<PASTE_URLS_HERE>

==============================================================================================

Trình bày lại nội dung sau bằng tiếng Việt.

Yêu cầu:
- Dịch dễ hiểu, giữ văn phong kỹ thuật.
- Giữ nguyên mọi thuật ngữ kỹ thuật, keyword và tên riêng bằng tiếng Anh.
- Không thêm nội dung được suy luận.
- Không lược bỏ hoặc bổ sung thông tin.
- Giữ nguyên cấu trúc và định dạng (heading, bảng, danh sách, code...).
- Đầu ra ở định dạng Markdown.

Nội dung:
<PASTE_CONTENT_HERE>

==============================================================================================

Trình bày lại nội dung sau bằng tiếng Việt.

Yêu cầu:
- Dịch dễ hiểu, giữ văn phong kỹ thuật.
- Trình bày theo dạng "condensed version": rút gọn câu chữ nhưng vẫn giữ gần như toàn bộ thông tin kỹ thuật quan trọng.
- Ưu tiên diễn đạt trực tiếp, loại bỏ các từ ngữ dư thừa hoặc lặp lại, nhưng không làm thay đổi ý nghĩa.
- Giữ nguyên mọi thuật ngữ kỹ thuật, keyword và tên riêng bằng tiếng Anh.
- Không thêm nội dung được suy luận.
- Giữ nguyên cấu trúc và định dạng (heading, bảng, danh sách, code...) nếu phù hợp.
- Đầu ra ở định dạng Markdown.

Nội dung:
<PASTE_CONTENT_HERE>


==============================================================================================

Sử dụng nội dung dưới đây để trả lời câu hỏi "<PASTE_CONTENT_HERE> ?" bằng tiếng Việt.

Yêu cầu:
- Chỉ sử dụng thông tin có trong nội dung được cung cấp.
- Ưu tiên diễn đạt trực tiếp, rõ ràng và chính xác.
- Loại bỏ các từ ngữ dư thừa hoặc lặp lại nhưng không làm thay đổi ý nghĩa.
- Không tự suy luận hoặc bổ sung thông tin không có trong nội dung.
- Giữ nguyên các thuật ngữ kỹ thuật quan trọng khi cần thiết.
- Tập trung trả lời trực tiếp câu hỏi.
- Đầu ra ở định dạng Markdown.

Nội dung:
<PASTE_CONTENT_HERE>
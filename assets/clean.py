import dash
import dash_html_components as html
import pandas as pd
import csv
import os

def merge_csv_files():

    output_file_path = 'C:/Users/ADMIN/Desktop/Web_Food (1)/assets/order_files/merged_orders.csv'  # Đường dẫn đến file CSV kết quả
    csv_directory = 'C:/Users/ADMIN/Desktop/Web_Food (1)/assets/order_files'  # Đường dẫn đến thư mục chứa các file CSV

    csv_files = [file for file in os.listdir(csv_directory) if file.endswith('.csv')]  # Lấy danh sách các file CSV trong thư mục

    merged_data = []  # Danh sách chứa dữ liệu gộp từ các file CSV

    for csv_file in csv_files:
        file_path = os.path.join(csv_directory, csv_file)
        with open(file_path, 'r', newline='', encoding='utf-8') as file:
            reader = csv.reader(file)
            data = list(reader)  # Đọc dữ liệu từ file CSV
            product_details = []  # Danh sách chứa thông tin chi tiết món
            for row in data[:-2]:
                product_name = row[0]
                quantity = row[2]  # Chỉnh chỉ mục tương ứng với cột số lượng trong file CSV của bạn
                product_details.append(f"{product_name} ({quantity})")
            total_price = data[-2][1]  # Lấy giá trị tổng tiền
            order_time = data[-1][1]  # Lấy giá trị thời gian đặt hàng
            merged_data.append([len(merged_data) + 1, product_details, total_price, order_time])  # Thêm dữ liệu gộp vào danh sách

    with open(output_file_path, 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['STT đơn', 'Chi tiết món', 'Tổng tiền', 'Thời gian order'])  # Ghi dòng tiêu đề
        writer.writerows(merged_data)  # Ghi dữ liệu gộp vào file CSV kết quả

    print('Gộp các file thành công!')


merge_csv_files()

df = pd.read_csv("C:/Users/ADMIN/Desktop/Web_Food (1)/assets/order_files/merged_orders.csv")
df = df.drop(df.index[-1])


# Đường dẫn đến thư mục chứa các file
folder_path = 'C:/Users/ADMIN/Desktop/Web_Food (1)/assets/order_files'

# Lấy danh sách các file trong thư mục
file_list = os.listdir(folder_path)

# Khởi tạo DataFrame rỗng
combined_df = pd.DataFrame()

# Gom nhóm và gộp các file lại với nhau
for file_name in file_list:
    if file_name.startswith('order_'):
        file_path = os.path.join(folder_path, file_name)
        try:
            # Đọc file
            df_1 = pd.read_csv(file_path)

            # Lấy thời gian đặt hàng từ tên file
            order_id = file_name.split('_')[1]

            # Thêm cột "order_id" với giá trị thời gian đặt hàng
            df['order_id'] = order_id

            # Gộp DataFrame vào DataFrame chung
            combined_df = pd.concat([combined_df, df_1], ignore_index=True)
        except pd.errors.ParserError as e:
            print(f"Lỗi đọc file {file_name}: {str(e)}")

# Lưu DataFrame kết quả vào file mới
combined_df.to_csv('C:/Users/ADMIN/Desktop/Web_Food (1)/assets/order_files/combined_orders.csv', index=False)
print(combined_df)


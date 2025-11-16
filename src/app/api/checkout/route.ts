// src/app/api/checkout/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';
import Airtable from 'airtable';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';

// === KHỞI TẠO 1 LẦN (AN TOÀN TRÊN SERVER) ===
const resend = new Resend(process.env.RESEND_API_KEY);
const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID as string
);
const ordersTable = base(process.env.AIRTABLE_ORDERS_TABLE_NAME as string);
const ordersProductsTable = base('orders-products');
// ===============================================

export async function POST(request: Request) {
  try {
    // ----------------------------------------------------------------
    // BƯỚC A: NHẬN DỮ LIỆU TỪ FRONTEND
    // ----------------------------------------------------------------
    const body = await request.json();
    const { values, cartItems, cartTotal } = body;
    const { name, phone, email, address } = values; // 'email' ở đây là CỦA KHÁCH HÀNG

    // (Code Bước B: Lưu vào Bảng 'orders' - Giữ nguyên)
    console.log('Đang lưu vào Bảng orders...');
    const newOrderRecord = await ordersTable.create([
      {
        fields: {
          name: name,
          phone: phone,
          email: email,
          address: address, // (Đã sửa 2 chữ 'd')
          status: 'Pending',
        },
      },
    ]);
    const orderId = newOrderRecord[0].id;
    console.log(`Đã lưu orders, ID: ${orderId}`);

    // (Code Bước C: Lưu vào Bảng 'orders-products' - Giữ nguyên)
    console.log('Đang lưu vào Bảng orders-products...');
    const records = cartItems.map((item: any) => {
      return {
        fields: {
          price: item.price,
          quantity: item.quantity,
          product_variant: [item.variant_id],
          orders: [orderId],
        },
      };
    });
    await ordersProductsTable.create(records);
    console.log('Đã lưu orders-products');

    // ----------------------------------------------------------------
    // BƯỚC D: GỬI MAIL "CHẠY THẬT"
    // ----------------------------------------------------------------
    console.log('Đang gửi email thật cho khách hàng:', email);

    await resend.emails.send({
      // === 1. SỬA DÒNG NÀY ===
      // Gửi từ domain ĐÃ XÁC THỰC của bạn
      from: 'ThapCamStore <donhang@grocery4everybody.id.vn>',

      // === 2. SỬA DÒNG NÀY ===
      // Gửi đến email của KHÁCH HÀNG (biến 'email' từ Bước A)
      to: [email],

      // Bỏ chữ [TEST]
      subject: `Xác nhận đơn hàng #${orderId}`,

      react: React.createElement(OrderConfirmationEmail, {
        customerName: name,
        orderId: orderId,
        items: cartItems.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: cartTotal,
      }),
    });

    console.log('Đã gửi email thành công cho:', email);

    // (Code Bước E: Trả về Frontend - Giữ nguyên)
    return NextResponse.json({
      success: true,
      message: 'Đã lưu đơn hàng VÀ gửi email thành công!',
      orderId: orderId,
    });
  } catch (error) {
    console.error('Lỗi nghiêm trọng:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

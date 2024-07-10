import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderService } from './order.service';

// create order
const createOrder = catchAsync(async (req, res) => {
  const result = await OrderService.createOrderInToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

// get all order
const getAllOrder = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    order = 'desc',
    search = '',
    status = '',
  } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const result = await OrderService.getAllOrderFromDB({
    search: search as string,
    limit: limitNumber,
    page: pageNumber,
    order: order as string,
    status: status as string,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders returned successfully',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const result = await OrderService.updateOrderStatusInDB(orderId, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status updated successfully',
    data: result,
  });
});

const getStatusCounts = catchAsync(async (req, res) => {
  const result = await OrderService.getStatusCountsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status counts returned successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  updateOrderStatus,
  getStatusCounts,
};

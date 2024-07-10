import { IOrder, IOrderQuery, OrderFilter } from './order.interface';

import Order from './order.model';

// create order service
const createOrderInToDB = async (payload: IOrder) => {
  const result = await Order.create(payload);
  return result;
};

const getAllOrderFromDB = async ({
  search,
  limit,
  page,
  order,
  status,
}: IOrderQuery) => {
  const searchFilter: OrderFilter = {};

  if (status) {
    searchFilter.status = status;
  }

  if (search) {
    searchFilter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];
  }

  // Calculate total documents
  const totalDocuments = await Order.countDocuments(searchFilter);

  // Fetch orders with pagination, sorting, and searching
  const orders = await Order.find(searchFilter)
    .select('-__v')
    .sort({ createdAt: order === 'desc' ? -1 : 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    orders,
    pagination: {
      totalItems: totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: page,
      itemPerPage: limit,
    },
  };
};

const updateOrderStatusInDB = async (orderId: string, status: string) => {
  const validStatuses = [
    'pending',
    'confirmed',
    'shipped',
    'delivered',
    'cancelled',
  ];

  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true },
  );

  return updatedOrder;
};

const getStatusCountsFromDB = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: '$_id',
        count: 1,
      },
    },
  ]);

  return result;
};

export const OrderService = {
  createOrderInToDB,
  getAllOrderFromDB,
  updateOrderStatusInDB,
  getStatusCountsFromDB,
};

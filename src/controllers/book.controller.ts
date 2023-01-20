import bookSchema from '../models/book.schema';
import AppError from '../utility/app-error';
import { NextFunction, Request } from 'express';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { uploadCloudinary } from '../utility/upload-cloudinary';
import categorySchema from '../models/category.schema';
import {
	BookRequestType,
	BookResponseType,
	FindOneBookResponseType,
	RemoveBookResponseType,
} from '../type/book.type';
import { Category } from '../interface/category';
import { Book } from '../interface/book';
import shelfSchema from '../models/shelf.schema';
import { Shelf } from '../interface/shelf';
import { categoryPopulated, shelfPopulated } from '../utility/custom-response';

export const findAll = async (req: Request, res: BookResponseType, next: NextFunction) => {
	try {
		const book = (await bookSchema
																	.find({})
																	.populate(shelfPopulated)
																	.populate(categoryPopulated)
																	.select('-__v')
																	.exec()) as unknown as Book[];

		return res.status(200).json({
			message: 'Successfully retrieved!',
			data: book,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const findById = async (req: Request, res: FindOneBookResponseType, next: NextFunction) => {
	try {
		const { id } = req.params;
		const data = (await bookSchema
																	.findOne({ _id: id })
																	.populate(shelfPopulated)
																	.populate(categoryPopulated)
																	.select('-__v')
																	.exec()) as unknown as Book;

		return res.status(200).json({
			message: 'Data successfully retrieved',
			data,
		});

	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: BookRequestType, res: FindOneBookResponseType, next: NextFunction) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded!' });
		}

		let uploadAPI: UploadApiResponse;
		try {
			uploadAPI = await uploadCloudinary(req.file.path, 'LMS/books');
		} catch (e) {
			return res.status(400).json({ message: 'Bad Request!' });
		}

		const { originalname: filename } = req.file;
		const { secure_url, bytes, format, public_id } = uploadAPI;
		const {
			category: { id },
			shelf: { id: shelfId },
		} = req.body;

		const category = await categorySchema.findById(id);
		const shelf = await shelfSchema.findById(shelfId);
		const newBook = await bookSchema.create({
			// title, author, isbn, price, description, publishDate,
			...req.body,
			images: {
				public_id,
				filename,
				secure_url,
				format,
				sizeInBytes: bytes,
			},
			category: { _id: category?._id },
			shelf: {
				_id: shelf?._id,
				shelfNumber: shelf?.shelfNumber,
				floor: shelf?.floor,
			},
		});

		await shelfSchema.updateOne({
			$push: {
				book: newBook,
			},
		});

		return res.status(201).json({
			message: 'New Book Successfully Created!',
			data: newBook,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const remove = async (req: Request, res: RemoveBookResponseType, next: NextFunction) => {
	try {
		const { id } = req.params;
		let publicId: string | undefined;
		const book = (await bookSchema.findOne({ _id: id })) as Book;

		if (book !== null) {
			publicId = book.images.public_id;
		}

		if (publicId != undefined || publicId != null) {
			await cloudinary.uploader.destroy(publicId);
		}

		await shelfSchema.updateOne({
			$pull: {
				book: {
					_id: book.id,
				},
			},
		});

		await bookSchema.findByIdAndRemove(id);
		return res.status(200).json({
			message: 'Data successfully removed',
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const update = async (req: Request, res: FindOneBookResponseType, next: NextFunction) => {
	try {
		const {
			category: { id },
			shelf: { id: shelfId },
			title, author, isbn, price, description, publishDate,
		} = req.body;

		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded!' });
		}

		const book = (await bookSchema.findById({ _id: req.params.id })) as Book;
		const category = (await categorySchema.findById(id)) as Category;
		const shelf = (await shelfSchema.findById(shelfId)) as Shelf;

		const { images: { public_id: publicId } } = book;

		if (publicId != null) {
			await cloudinary.uploader.destroy(publicId);
		}

		const uploadAPI: UploadApiResponse = await uploadCloudinary(req.file.path, 'LMS/books');

		const { originalname } = req.file;
		const { secure_url, bytes, format, public_id } = uploadAPI;

		const newBook = await bookSchema.findByIdAndUpdate(req.params.id, 
			{ 
				title, author, isbn, price, description, publishDate,
			images: {
				public_id,
				fileName: originalname,
				secure_url,
				sizeInBytes: bytes,
				format,
			},
			category: { _id: category?.id, name: category?.name },
			shelf: {
				_id: shelf?.id,
				shelfNumber: shelf?.shelfNumber,
				floor: shelf?.floor,
			},
		});

		await shelfSchema.updateMany(
			{ _id: book?.id },
			{
				$push: {
					book: newBook,
				},
			}
		);

		return res.status(201).json({
			message: 'Book Successfully Updated!',
		});
		
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

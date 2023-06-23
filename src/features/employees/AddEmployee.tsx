import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { TechStack } from 'src/types';
import { getEmployeeTechStack } from 'src/helpers';
import { chevronDown, chevronLeft } from 'assets/media';
import { useCreateEmployeeMutation } from 'store/slices/employeesApiSlice';
import SideDrawer from 'components/navigation/SideDrawer';
import Footer from 'components/layout/Footer';
import InputField from 'components/formElements/InputField';
import ImageUpload from 'components/formElements/ImageUpload';
import CurrencySelector from 'components/selectors/CurrencySelector';
import DepartmentSelector from 'components/selectors/DepartmentSelector';

type Props = {
	closeAddEmployeeSideDrawer: () => void;
};

const AddEmployee = ({ closeAddEmployeeSideDrawer }: Props) => {
	const salaryRef = useRef<HTMLInputElement | null>(null);
	const [salaryInputFieldHeight, setSalaryInputFieldHeight] = useState(0);
	const [isTechStackMenuOpen, setIsTechStackMenuOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [image, setImage] = useState<File | undefined>();
	const [department, setDepartment] = useState('');
	const [salary, setSalary] = useState('');
	const [currency, setCurrency] = useState('BAM');
	const [techStack, setTechStack] = useState('');

	const [createEmployee, { isSuccess }] = useCreateEmployeeMutation();

	const addEmployee = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		if (image) formData.append('image', image);
		formData.append('department', department);
		formData.append('salary', salary);
		formData.append('currency', currency);
		formData.append('techStack', techStack);
		await createEmployee(formData);
	};

	useEffect(() => {
		if (isSuccess) closeAddEmployeeSideDrawer();
	}, [isSuccess]);

	useEffect(() => {
		if (!isSuccess) {
			if (department === 'Administration' && techStack === 'MgmtNA') setTechStack('AdminNA');
			else if (department === 'Management' && techStack === 'AdminNA') setTechStack('MgmtNA');
		}
	}, [department]);

	useLayoutEffect(() => {
		setSalaryInputFieldHeight(salaryRef.current?.offsetHeight ?? 0);
	}, []);

	const children = (
		<motion.div
			initial={{ opacity: 0, x: '100%' }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			className='fixed right-0 top-0 z-20 flex min-h-full w-[496px] flex-col bg-frosty-mint px-6 pt-[27px]'
		>
			<header className='flex flex-col gap-[13px]'>
				<div className='flex cursor-pointer items-center gap-[3px]' onClick={closeAddEmployeeSideDrawer}>
					<img className='h-4 w-4' src={chevronLeft} alt='Back icon' />
					<span className='font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-evergreen'>Back</span>
				</div>
				<h2 className='rounded-lg bg-white px-6 py-4 font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey'>
					Add New Employee
				</h2>
			</header>
			<main className='mt-4 rounded-lg bg-white p-6'>
				<form className='flex flex-col gap-4'>
					<InputField
						containerClassName='gap-1'
						labelClassName='leading-[22px]'
						inputClassName='border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone'
						required
						type='text'
						label='First Name'
						htmlFor='firstName'
						id='firstName'
						name='firstName'
						placeholder='First Name'
						value={firstName}
						handleInput={firstName => setFirstName(firstName)}
					/>
					<InputField
						containerClassName='gap-1'
						labelClassName='leading-[22px]'
						inputClassName='border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone'
						required
						type='text'
						label='Last Name'
						htmlFor='lastName'
						id='lastName'
						name='lastName'
						placeholder='Last Name'
						value={lastName}
						handleInput={lastName => setLastName(lastName)}
					/>
					<ImageUpload
						containerClassName='gap-1'
						labelClassName='leading-[22px]'
						inputClassName='h-[104px] w-[104px] border-ashen-grey bg-frosty-mint'
						label='Profile Image'
						image={image}
						handleImageUpload={file => setImage(file)}
					/>
					<DepartmentSelector
						department={department}
						handleDepartmentSelection={department => setDepartment(department)}
					/>
					<div className='flex gap-2'>
						<InputField
							ref={salaryRef}
							containerClassName='gap-1'
							labelClassName='leading-[22px]'
							inputContainerClassName='flex gap-2 w-full'
							inputClassName='border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone'
							required
							type='number'
							label='Monthly Salary'
							htmlFor='salary'
							id='salary'
							name='salary'
							min={0}
							step={0.01}
							placeholder='Enter the amount'
							value={salary}
							handleInput={salary => setSalary(salary)}
						/>
						<CurrencySelector
							height={salaryInputFieldHeight}
							currency={currency}
							handleCurrencySelection={currency => setCurrency(currency)}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<span className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>
							Tech Stack
						</span>
						<div className='relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none'>
							<div
								className='flex cursor-pointer items-center justify-between'
								onClick={() => setIsTechStackMenuOpen(!isTechStackMenuOpen)}
							>
								<span className='font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'>
									{!techStack ? 'Select stack' : getEmployeeTechStack(techStack as TechStack)}
								</span>
								<img
									className={`transition ${isTechStackMenuOpen ? 'rotate-180' : ''}`}
									src={chevronDown}
									alt='Down icon'
								/>
							</div>
							{isTechStackMenuOpen && (
								<div className='absolute left-0 top-10 flex w-[400px] flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2'>
									<div className='flex items-center gap-2 px-4 py-1'>
										<input
											className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
											type='checkbox'
											id='na'
											name='na'
											checked={techStack === 'AdminNA' || techStack === 'MgmtNA'}
											onChange={event => {
												setTechStack(
													event.target.checked ? (department === 'Administration' ? 'AdminNA' : 'MgmtNA') : ''
												);
												setIsTechStackMenuOpen(false);
											}}
										/>
										<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='na'>
											N/A
										</label>
									</div>
									<div className='flex items-center gap-2 px-4 py-1'>
										<input
											className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen  focus:ring-transparent'
											type='checkbox'
											id='fullstack'
											name='fullstack'
											checked={techStack === 'FullStack'}
											onChange={event => {
												setTechStack(event.target.checked ? 'FullStack' : '');
												setIsTechStackMenuOpen(false);
											}}
										/>
										<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='fullstack'>
											Full Stack
										</label>
									</div>
									<div className='flex items-center gap-2 px-4 py-1'>
										<input
											className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen  focus:ring-transparent'
											type='checkbox'
											id='backend'
											name='backend'
											checked={techStack === 'Backend'}
											onChange={event => {
												setTechStack(event.target.checked ? 'Backend' : '');
												setIsTechStackMenuOpen(false);
											}}
										/>
										<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='backend'>
											Back End
										</label>
									</div>
									<div className='flex items-center gap-2 px-4 py-1'>
										<input
											className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
											type='checkbox'
											id='frontend'
											name='frontend'
											checked={techStack === 'Frontend'}
											onChange={event => {
												setTechStack(event.target.checked ? 'Frontend' : '');
												setIsTechStackMenuOpen(false);
											}}
										/>
										<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='frontend'>
											Front End
										</label>
									</div>
									<div className='flex items-center gap-2 px-4 py-1'>
										<input
											className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
											type='checkbox'
											id='uxui'
											name='uxui'
											checked={techStack === 'UXUI'}
											onChange={event => {
												setTechStack(event.target.checked ? 'UXUI' : '');
												setIsTechStackMenuOpen(false);
											}}
										/>
										<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='uxui'>
											UX/UI
										</label>
									</div>
								</div>
							)}
						</div>
					</div>
				</form>
			</main>
			<Footer
				firstButtonClassName='border border-deep-teal text-evergreen'
				secondButtonClassName='bg-deep-teal text-white'
				firstButtonText='Cancel'
				secondButtonText='Add Employee'
				handleFirstButtonClick={closeAddEmployeeSideDrawer}
				handleSecondButtonClick={addEmployee}
			/>
		</motion.div>
	);

	return <SideDrawer onClick={closeAddEmployeeSideDrawer}>{children}</SideDrawer>;
};

export default AddEmployee;

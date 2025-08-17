import React, { useState } from 'react';
import { Icon } from '@iconify/react'; // hoặc icon của bạn

const AdminForm = ({
    fields,
    values,
    onChange,
    errors = {},
    className = ""
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const renderField = (field) => {
        const commonClasses = "w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300";
        const errorClasses = errors[field.name] ? "border-red-500" : "border-gray-300";

        if (field.type === 'password') {
            return (
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id={field.name}
                        name={field.name}
                        value={values[field.name] || ''}
                        onChange={(e) => onChange(field.name, e.target.value)}
                        className={`${commonClasses} ${errorClasses} pr-10`}
                        placeholder={field.placeholder}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                        tabIndex={-1}
                    >
                        <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} width="20" height="20" />
                    </button>
                </div>
            );
        }

        switch (field.type) {
            case 'textarea':
                return (
                    <textarea
                        id={field.name}
                        name={field.name}
                        value={values[field.name] || ''}
                        onChange={(e) => onChange(field.name, e.target.value)}
                        className={`${commonClasses} ${errorClasses} min-h-[100px]`}
                        placeholder={field.placeholder}
                    />
                );

            case 'select':
                return (
                    <select
                        id={field.name}
                        name={field.name}
                        value={values[field.name] || ''}
                        onChange={(e) => onChange(field.name, e.target.value)}
                        className={`${commonClasses} ${errorClasses}`}
                    >
                        <option value="">{field.placeholder}</option>
                        {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'checkbox':
                return (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id={field.name}
                            name={field.name}
                            checked={values[field.name] || false}
                            onChange={(e) => onChange(field.name, e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={field.name} className="ml-2 block text-sm text-gray-900">
                            {field.label}
                        </label>
                    </div>
                );

            case 'file':
                return (
                    <input
                        type="file"
                        id={field.name}
                        name={field.name}
                        onChange={(e) => onChange(field.name, e.target.files[0])}
                        className={`${commonClasses} ${errorClasses}`}
                        accept={field.accept}
                    />
                );

            default:
                return (
                    <input
                        type={field.type || 'text'}
                        id={field.name}
                        name={field.name}
                        value={values[field.name] || ''}
                        onChange={(e) => onChange(field.name, e.target.value)}
                        className={`${commonClasses} ${errorClasses}`}
                        placeholder={field.placeholder}
                    />
                );
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {fields.map((field) => {
                if (field.show && !field.show(values)) return null;

                return (
                    <div key={field.name}>
                        {field.type !== 'checkbox' && (
                            <label
                                htmlFor={field.name}
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                        )}
                        {renderField(field)}
                        {errors[field.name] && (
                            <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default AdminForm;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, Check } from 'lucide-react';
import { CreateStore, CreateStoreSchema } from '@/lib/schemas/dashboard';
import { useStoreDraftStore } from '@/lib/store/dashboard';

interface StoreWizardStepOneProps {
  onNext: (data: CreateStore) => void;
}

const industries = [
  'Fashion & Clothing',
  'Beauty & Cosmetics',
  'Electronics',
  'Home & Garden',
  'Sports & Fitness',
  'Books & Media',
  'Food & Beverages',
  'Jewelry & Accessories',
  'Art & Crafts',
  'Health & Wellness',
  'Other',
];

const countries = [
  { code: 'CO', name: 'Colombia', currency: 'COP' },
  { code: 'MX', name: 'México', currency: 'MXN' },
  { code: 'AR', name: 'Argentina', currency: 'ARS' },
  { code: 'CL', name: 'Chile', currency: 'CLP' },
  { code: 'PE', name: 'Perú', currency: 'PEN' },
  { code: 'US', name: 'United States', currency: 'USD' },
];

export default function StoreWizardStepOne({ onNext }: StoreWizardStepOneProps) {
  const { draft, updateDraft } = useStoreDraftStore();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<CreateStore>({
    defaultValues: draft,
    mode: 'onChange',
  });

  const watchedFields = watch();

  // Update draft on form changes
  React.useEffect(() => {
    updateDraft(watchedFields);
  }, [watchedFields, updateDraft]);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setValue('logoUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: CreateStore) => {
    try {
      const validatedData = CreateStoreSchema.parse(data);
      onNext(validatedData);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const selectedCountry = countries.find((c) => c.code === watchedFields.country);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Your Store</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Lets set up your online store. This will only take a few minutes.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Store Name *
            </label>
            <input
              {...register('name', { required: 'Store name is required' })}
              type="text"
              placeholder="My Amazing Store"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Industry *
            </label>
            <select
              {...register('industry', { required: 'Industry is required' })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
            >
              <option value="">Select an industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.industry.message}
              </p>
            )}
          </div>

          {/* Country & Currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country *
              </label>
              <select
                {...register('country', { required: 'Country is required' })}
                onChange={(e) => {
                  const country = countries.find((c) => c.code === e.target.value);
                  if (country) {
                    setValue('currency', country.currency);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Currency *
              </label>
              <input
                {...register('currency', { required: 'Currency is required' })}
                type="text"
                value={selectedCountry?.currency || ''}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
              />
            </div>
          </div>

          {/* Brand Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Brand Color *
            </label>
            <div className="flex items-center gap-3">
              <input
                {...register('brandColor', { required: 'Brand color is required' })}
                type="color"
                className="h-10 w-20 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
              <input
                {...register('brandColor')}
                type="text"
                placeholder="#22c55e"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
              />
            </div>
            {errors.brandColor && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.brandColor.message}
              </p>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo (Optional)
            </label>
            <div className="flex items-center gap-4">
              {logoPreview ? (
                <div className="relative">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-16 w-16 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              ) : (
                <div className="h-16 w-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
              )}

              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Logo
                </label>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">PNG, JPG up to 2MB</p>
              </div>
            </div>
          </div>

          {/* Subdomain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Store URL *
            </label>
            <div className="flex items-center">
              <input
                {...register('subdomain', {
                  required: 'Subdomain is required',
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: 'Only lowercase letters, numbers, and hyphens allowed',
                  },
                })}
                type="text"
                placeholder="my-store"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
              />
              <span className="px-3 py-2 bg-gray-50 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-500 dark:text-gray-400 text-sm">
                .emprendyup.com
              </span>
            </div>
            {errors.subdomain && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.subdomain.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={!isValid}
              className="px-6 py-3 bg-fourth-base text-black rounded-lg hover:bg-fourth-base/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Create Store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

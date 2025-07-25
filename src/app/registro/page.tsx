'use client';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import Layout from '../components/layout';

const REGISTER_MUTATION = gql`
  mutation CreateEntrepreneur($data: CreateEntrepreneurDto!) {
    createEntrepreneur(input: $data) {
      id
      name
      email
      category
      referralSource
      createdAt
    }
  }
`;

const categories = ['TECHNOLOGY', 'FOOD', 'FASHION', 'EDUCATION', 'HEALTH', 'OTHER'];
const referralSources = ['GOOGLE', 'FACEBOOK', 'INSTAGRAM', 'FRIEND', 'OTHER'];

export default function RegistroPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [registerBusiness, { data, loading, error }] = useMutation(REGISTER_MUTATION);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (formData: any) => {
    try {
      await registerBusiness({ variables: { input: formData } });
      setSuccess(true);
      reset();
    } catch (e) {
      console.error('Error registering business:', e);
      setSuccess(false);
    }
  };

  return (
    <Layout>
      <section className="relative table w-full items-center pt-36 pb-52 bg-primary bg-[url('/images/hero/bg-shape.png')] bg-center bg-no-repeat bg-cover">
        <div className="container relative">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Conecta, crece y emprende
          </h1>
          <p className="text-lg text-white text-center mb-8">
            Únete a nuestra comunidad de emprendedores completando el formulario.
          </p>
        </div>
      </section>
      <div className=" relative z-2 max-w-xl mx-auto mt-[-150px] pb-16 px-2 sm:px-4">
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 sm:p-10">
          <h1 className="text-3xl font-extrabold mb-2 text-center text-slate-900 dark:text-white tracking-tight">
            Registra tu Emprendimiento
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-base">
            Completa el formulario para unirte a la comunidad
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
                Nombre
              </label>
              <input
                {...register('name', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Ej: Juan Perez"
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Ej: correo@email.com"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
                Sitio Web
              </label>
              <input
                {...register('website', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="https://miemprendimiento.com"
              />
              {errors.website && (
                <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
                Categoría
              </label>
              <select
                {...register('category', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
                Teléfono
              </label>
              <input
                {...register('phone', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="+573001234567"
              />
              {errors.phone && (
                <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
                Identificación
              </label>
              <input
                {...register('identification', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="123456789"
              />
              {errors.identification && (
                <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
                Descripción
              </label>
              <textarea
                {...register('description', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Describe tu emprendimiento..."
              />
              {errors.description && (
                <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
                País
              </label>
              <input
                {...register('country', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Colombia"
              />
              {errors.country && (
                <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
                Ciudad
              </label>
              <input
                {...register('city', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Bogotá"
              />
              {errors.city && (
                <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
                ¿Cómo nos encontraste?
              </label>
              <select
                {...register('referralSource', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              >
                <option value="">Selecciona una opción</option>
                {referralSources.map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </select>
              {errors.referralSource && (
                <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-primary-base to-primary-300 text-white font-bold rounded-xl shadow hover:from-primary-400 hover:to-primary-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              {loading ? 'Enviando...' : 'Registrar'}
            </button>
            {success && (
              <p className="text-green-600 text-center mt-2 font-semibold">¡Registro exitoso!</p>
            )}
            {error && (
              <p className="text-red-500 text-center mt-2 font-semibold">Error: {error.message}</p>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}

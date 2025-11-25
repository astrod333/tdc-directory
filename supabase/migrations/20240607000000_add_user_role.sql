-- Add role column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

-- Create enum for roles if we want to be strict, but text is fine for now with check constraint
ALTER TABLE public.users ADD CONSTRAINT users_role_check CHECK (role IN ('user', 'admin'));

-- Update policies to allow admins to view all users
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

-- Update policies to allow admins to update users (assign roles)
CREATE POLICY "Admins can update users" ON public.users
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

-- Allow admins to view all products (already covered by "Public can view products" but good to be explicit if that changes)
-- The existing policy "Public can view products" covers SELECT for everyone.

-- Allow admins to update any product
CREATE POLICY "Admins can update any product" ON public.products
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

-- Allow admins to delete any product
CREATE POLICY "Admins can delete any product" ON public.products
  FOR DELETE
  USING (
    auth.uid() IN (
      SELECT id FROM public.users WHERE role = 'admin'
    )
  );

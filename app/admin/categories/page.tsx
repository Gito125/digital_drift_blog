"use client";

import { useState, useEffect } from "react";
import { Category } from "@/models/Category";
import CreateCategoryModel from "@/components/ui/CreateCategoryModel";

type CategoryWithStatus = Category & { status: 'active' | 'inactive' };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });
  const [editCategory, setEditCategory] = useState({ name: '', slug: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/categories`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        // Add status to each category for display purposes (categories in this system are always active)
        const categoriesWithStatus = data.categories.map((cat: Category) => ({
          ...cat,
          status: 'active' as const
        }));
        setCategories(categoriesWithStatus);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching categories");
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create category");
      }

      const { category } = await res.json();
      setCategories([...categories, { ...category, status: 'active' }]);
      setNewCategory({ name: '', slug: '', description: '' });
      setShowCreateModal(false);
      alert("Category created successfully!");
    } catch (err) {
      console.error("Failed to create category:", err);
      alert(err instanceof Error ? err.message : "An error occurred while creating the category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/categories/${selectedCategory._id.toString()}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCategory)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update category");
      }

      // Update category in the UI
      setCategories(categories.map(cat =>
        cat._id.toString() === selectedCategory._id.toString()
          ? { ...cat, ...editCategory, status: 'active' as const }
          : cat
      ));

      setShowEditModal(false);
      setSelectedCategory(null);
      setEditCategory({ name: '', slug: '', description: '' });
      alert("Category updated successfully!");
    } catch (err) {
      console.error("Failed to update category:", err);
      alert(err instanceof Error ? err.message : "An error occurred while updating the category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete category");
      }

      setCategories(categories.filter(cat => cat._id.toString() !== id));
      alert("Category deleted successfully!");
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert(err instanceof Error ? err.message : "An error occurred while deleting the category");
    }
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setEditCategory({
      name: category.name,
      slug: category.slug,
      description: category.description
    });
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-foreground/60">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Categories</h1>
            <p className="text-foreground/60">Manage your blog categories and tags</p>
          </div>
        </div>

        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Categories</h1>
          <p className="text-foreground/60">Manage your blog categories and tags</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="group px-6 py-3 bg-accent text-white rounded-xl hover:opacity-90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Category</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-background/60 backdrop-blur-sm border border-foreground/10 rounded-xl p-6 hover:border-accent/50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{categories.length}</p>
              <p className="text-sm text-foreground/60">Total Categories</p>
            </div>
          </div>
        </div>

        <div className="bg-background/60 backdrop-blur-sm border border-foreground/10 rounded-xl p-6 hover:border-accent/50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{categories.filter(cat => cat.status === 'active').length}</p>
              <p className="text-sm text-foreground/60">Active</p>
            </div>
          </div>
        </div>

        <div className="bg-background/60 backdrop-blur-sm border border-foreground/10 rounded-xl p-6 hover:border-accent/50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">Latest</p>
              <p className="text-sm text-foreground/60">Recently Added</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-background/60 backdrop-blur-sm border border-foreground/10 rounded-xl overflow-hidden shadow-lg">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-foreground/10 bg-foreground/5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">All Categories</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-foreground/5 transition-colors text-foreground/60 hover:text-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-foreground/5 transition-colors text-foreground/60 hover:text-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-foreground/10">
            <thead>
              <tr className="bg-foreground/5">
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/10">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-foreground font-medium mb-1">No categories found</p>
                        <p className="text-foreground/60 text-sm">Create your first category to get started</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category._id.toString()} className="hover:bg-foreground/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <span className="text-accent font-semibold text-sm">
                            {category.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{category.name}</p>
                          {category.description && (
                            <p className="text-foreground/60 text-sm mt-1">{category.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="px-2 py-1 bg-foreground/5 rounded text-sm text-foreground/80 font-mono">
                        {category.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 rounded-lg hover:bg-accent/10 text-accent transition-colors group"
                          onClick={() => openEditModal(category)}
                          title="Edit category"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          className="p-2 rounded-lg hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors group"
                          onClick={() => handleDeleteCategory(category._id.toString())}
                          title="Delete category"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {categories.length > 0 && (
          <div className="px-6 py-4 border-t border-foreground/10 bg-foreground/5">
            <div className="flex items-center justify-between text-sm text-foreground/60">
              <p>Showing <span className="font-medium text-foreground">{categories.length}</span> categories</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-colors text-foreground/80 disabled:opacity-50">
                  Previous
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-colors text-foreground/80 disabled:opacity-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Category Modal */}
      <CreateCategoryModel showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} handleCreateCategory={handleCreateCategory} newCategory={newCategory} setNewCategory={setNewCategory} isSubmitting={isSubmitting} />


      {/* Edit Category Modal */}
      {showEditModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-2xl border border-foreground/20 w-full max-w-md shadow-xl transform transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">Edit Category</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCategory(null);
                    setEditCategory({ name: '', slug: '', description: '' });
                  }}
                  className="w-8 h-8 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditCategory}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="edit-name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="edit-name"
                      value={editCategory.name}
                      onChange={(e) => setEditCategory({...editCategory, name: e.target.value})}
                      className="w-full px-4 py-3 border border-foreground/20 rounded-xl bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                      placeholder="Enter category name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-slug" className="block text-sm font-medium text-foreground mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      id="edit-slug"
                      value={editCategory.slug}
                      onChange={(e) => setEditCategory({...editCategory, slug: e.target.value})}
                      className="w-full px-4 py-3 border border-foreground/20 rounded-xl bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                      placeholder="Enter category slug"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-description" className="block text-sm font-medium text-foreground mb-2">
                      Description
                    </label>
                    <textarea
                      id="edit-description"
                      value={editCategory.description}
                      onChange={(e) => setEditCategory({...editCategory, description: e.target.value})}
                      className="w-full px-4 py-3 border border-foreground/20 rounded-xl bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
                      placeholder="Enter category description"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-foreground/10">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedCategory(null);
                      setEditCategory({ name: '', slug: '', description: '' });
                    }}
                    className="px-5 py-3 border border-foreground/20 rounded-xl text-foreground hover:bg-foreground/5 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-3 bg-accent text-background rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 font-medium shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? 'Updating...' : 'Update Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

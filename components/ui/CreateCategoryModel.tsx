import React from 'react'
interface CreateCategoryModelProps {
    showCreateModal: boolean;
    setShowCreateModal: (show: boolean) => void;
    handleCreateCategory: (e: React.FormEvent) => void;
    newCategory: {
        name: string;
        slug: string;
        description: string;
    };
    setNewCategory: (category: { name: string; slug: string; description: string }) => void;
    isSubmitting: boolean;
}

const CreateCategoryModel = ({showCreateModal, setShowCreateModal, handleCreateCategory, newCategory, setNewCategory, isSubmitting }: CreateCategoryModelProps) => {
    return (
        <>
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-background border border-border shadow-xl">

                        {/* HEADER */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                            <h2 className="text-lg font-heading">Create Category</h2>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-muted hover:text-foreground transition"
                            >
                                ✕
                            </button>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleCreateCategory} className="px-6 py-5 space-y-5">

                            {/* NAME */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newCategory.name}
                                    onChange={(e) =>
                                        setNewCategory({ ...newCategory, name: e.target.value })
                                    }
                                    placeholder="e.g. Web Development"
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {/* SLUG */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Slug</label>
                                <input
                                    type="text"
                                    required
                                    value={newCategory.slug}
                                    onChange={(e) =>
                                        setNewCategory({ ...newCategory, slug: e.target.value })
                                    }
                                    placeholder="web-development"
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <p className="text-xs text-muted">
                                    URL-friendly identifier (lowercase, hyphens only)
                                </p>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    rows={3}
                                    value={newCategory.description}
                                    onChange={(e) =>
                                        setNewCategory({ ...newCategory, description: e.target.value })
                                    }
                                    placeholder="Short description (optional)"
                                    className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {/* ACTIONS */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-border">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-sm rounded-lg border border-border text-muted hover:bg-muted/50 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-5 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Creating…" : "Create Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateCategoryModel
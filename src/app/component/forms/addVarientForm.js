"use client";

import { useState } from "react";
import { HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";

import { useDispatch } from "react-redux";
import { createProductVarient } from "@/app/store/action/productAction";
import { useAttributes } from "@/app/hooks/attributeHook";

const createEmptyVariant = () => ({
  productType: "",

  attributes: [
    {
      name: "",
      value: "",
    },
  ],
  sku: "",
  pricing: {
    mrp: "",
    sellingPrice: "",
  },
  inventory: {
    stockQuantity: "",
  },  
  images: [],
  videos: [],
});

// ============================================================
// Dynamic field renderer based on attribute fieldType
// ============================================================
function AttributeValueInput({ attr, value, onChange }) {
  if (!attr) {
    return (
      <input
        className="border p-2 flex-1"
        placeholder="Value"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  switch (attr.fieldType) {
    case "select":
      return (
        <select
          className="border p-2 flex-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{attr.placeholder || "Select..."}</option>
          {attr.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );

    case "multiselect":
      return (
        <select
          className="border p-2 flex-1"
          multiple
          value={Array.isArray(value) ? value : []}
          onChange={(e) =>
            onChange(
              Array.from(e.target.selectedOptions, (o) => o.value)
            )
          }
        >
          {attr.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );

    case "boolean":
      return (
        <select
          className="border p-2 flex-1"
          value={String(value)}
          onChange={(e) => onChange(e.target.value === "true")}
        >
          <option value="">Select...</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      );

    case "number":
      return (
        <input
          type="number"
          className="border p-2 flex-1"
          placeholder={attr.placeholder || (attr.unit ? `Value (${attr.unit})` : "Value")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "date":
      return (
        <input
          type="date"
          className="border p-2 flex-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "textarea":
      return (
        <textarea
          className="border p-2 flex-1"
          placeholder={attr.placeholder || "Value"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    default: // text
      return (
        <input
          className="border p-2 flex-1"
          placeholder={attr.placeholder || "Value"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

export default function VariantForm({ product, onClose }) {
  const dispatch = useDispatch();

  // Load attribute definitions from DB
  const { attributes: attributeDefinitions, loading: attrLoading } = useAttributes();

  const [variants, setVariants] = useState([createEmptyVariant()]);

  // ==========================
  // NORMAL CHANGE
  // ==========================

  const updateField = (index, path, value) => {
    const updated = [...variants];

    let obj = updated[index];

    const keys = path.split(".");

    keys.forEach((key, i) => {
      if (i === keys.length - 1) {
        obj[key] = value;
      } else {
        obj = obj[key];
      }
    });

    setVariants(updated);
  };

  // ==========================
  // ATTRIBUTES
  // ==========================

  const addAttribute = (index) => {
    const updated = [...variants];

    updated[index].attributes.push({
      name: "",
      value: "",
    });

    setVariants(updated);
  };

  const updateAttribute = (variantIndex, attrIndex, field, value) => {
    const updated = [...variants];

    updated[variantIndex].attributes[attrIndex][field] = value;

    setVariants(updated);
  };

  // ==========================
  // MEDIA
  // ==========================

  const handleImages = (index, files) => {
    const updated = [...variants];

    updated[index].images = Array.from(files);

    setVariants(updated);
  };

  const handleVideos = (index, files) => {
    const updated = [...variants];

    updated[index].videos = Array.from(files);

    setVariants(updated);
  };

  // ==========================
  // ADD VARIANT
  // ==========================

  const addVariant = () => {
    setVariants([...variants, createEmptyVariant()]);
  };

  // ==========================
  // REMOVE
  // ==========================

  const removeVariant = (index) => {
    if (variants.length === 1) return;

    setVariants(variants.filter((_, i) => i !== index));
  };

  // ==========================
  // SUBMIT
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const payload = variants.map((v) => ({
      attributes: v.attributes,

      sku: v.sku,

      pricing: {
        mrp: Number(v.pricing.mrp),
        sellingPrice: Number(v.pricing.sellingPrice),
      },

      inventory: {
        stockQuantity: Number(v.inventory.stockQuantity),
      },

      fragranceDetails: v.fragranceDetails,

      usageDetails: v.usageDetails,

      capacity: v.capacity,

      isDefault: false,

      isActive: true,
    }));

    formData.append("variants", JSON.stringify(payload));

    // images

    variants.forEach((v) => {
      v.images.forEach((file) => {
        formData.append("media", file);
      });
    });

    // videos

    variants.forEach((v) => {
      v.videos.forEach((file) => {
        formData.append("media", file);
      });
    });

    await dispatch(createProductVarient(product._id, formData));

    onClose();
  };

  // ==========================
  // UI
  // ==========================

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-5">
      {variants.map((variant, index) => (
        <div key={index} className="border rounded-xl p-5 space-y-5">
          <div className="flex justify-between">
            <h2>Variant {index + 1}</h2>

            <button type="button" onClick={() => removeVariant(index)}>
              <HiOutlineTrash />
            </button>
          </div>

          {/* PRODUCT TYPE */}

          <select
            className="border p-2 w-full"
            value={variant.productType}
            onChange={(e) => updateField(index, "productType", e.target.value)}
          >
            <option value="">Select Product Type</option>

            <option value="candle">Fragrance Candle</option>

            <option value="diffuser">Room Diffuser</option>

            <option value="craft">Wooden Craft</option>
          </select>

          {/* SKU */}

          <input
            className="border p-2 w-full"
            placeholder="SKU"
            value={variant.sku}
            onChange={(e) => updateField(index, "sku", e.target.value)}
          />

          {/* ATTRIBUTES — loaded from DB attribute definitions */}

          <div>
            <h3 className="font-semibold mb-2">Attributes</h3>

            {attrLoading ? (
              <p className="text-sm text-gray-400">Loading attributes...</p>
            ) : (
              variant.attributes.map((a, i) => {
                // find the matching attribute definition for this row
                const attrDef = attributeDefinitions?.find(
                  (def) => def.name === a.name || def.slug === a.name
                );

                return (
                  <div key={i} className="flex gap-2 mt-2 items-start">
                    {/* Attribute Name — dropdown from DB definitions */}
                    <select
                      className="border p-2 flex-1"
                      value={a.name}
                      onChange={(e) => {
                        updateAttribute(index, i, "name", e.target.value);
                        // reset value when attribute type changes
                        updateAttribute(index, i, "value", "");
                      }}
                    >
                      <option value="">Select Attribute</option>
                      {attributeDefinitions?.map((def) => (
                        <option key={def._id} value={def.name}>
                          {def.name}
                          {def.unit ? ` (${def.unit})` : ""}
                        </option>
                      ))}
                    </select>

                    {/* Attribute Value — input type based on fieldType */}
                    <AttributeValueInput
                      attr={attrDef}
                      value={a.value}
                      onChange={(val) => updateAttribute(index, i, "value", val)}
                    />
                  </div>
                );
              })
            )}

            <button
              type="button"
              onClick={() => addAttribute(index)}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              + Add Attribute
            </button>
          </div>

          {/* PRICE */}

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              className="border p-2"
              placeholder="MRP"
              value={variant.pricing.mrp}
              onChange={(e) =>
                updateField(index, "pricing.mrp", e.target.value)
              }
            />

            <input
              type="number"
              className="border p-2"
              placeholder="Selling Price"
              value={variant.pricing.sellingPrice}
              onChange={(e) =>
                updateField(index, "pricing.sellingPrice", e.target.value)
              }
            />
          </div>

          {/* STOCK */}

          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Stock"
            value={variant.inventory.stockQuantity}
            onChange={(e) =>
              updateField(index, "inventory.stockQuantity", e.target.value)
            }
          />

          {/* CANDLE */}

          {variant.productType === "candle" && (
            <div className="space-y-3">
              <h3>Candle Details</h3>

              <input
                className="border p-2 w-full"
                placeholder="Burn Time Hours"
                value={variant.usageDetails.burnTime.value}
                onChange={(e) =>
                  updateField(
                    index,
                    "usageDetails.burnTime.value",
                    e.target.value,
                  )
                }
              />

              <input
                className="border p-2 w-full"
                placeholder="Wax Type"
                value={variant.usageDetails.waxType}
                onChange={(e) =>
                  updateField(index, "usageDetails.waxType", e.target.value)
                }
              />

              <input
                className="border p-2 w-full"
                placeholder="Wick Type"
                value={variant.usageDetails.wickType}
                onChange={(e) =>
                  updateField(index, "usageDetails.wickType", e.target.value)
                }
              />
            </div>
          )}

          {/* DIFFUSER */}

          {variant.productType === "diffuser" && (
            <div className="space-y-3">
              <h3>Diffuser Details</h3>

              <input
                className="border p-2 w-full"
                placeholder="Lasting Days"
                value={variant.usageDetails.fragranceDuration.value}
                onChange={(e) =>
                  updateField(
                    index,
                    "usageDetails.fragranceDuration.value",
                    e.target.value,
                  )
                }
              />

              <input
                className="border p-2 w-full"
                placeholder="Diffuser Type"
                value={variant.usageDetails.diffuserType}
                onChange={(e) =>
                  updateField(
                    index,
                    "usageDetails.diffuserType",
                    e.target.value,
                  )
                }
              />
            </div>
          )}

          {/* CRAFT */}

          {variant.productType === "craft" && (
            <div className="space-y-3">
              <h3>Wooden Craft Details</h3>

              <input
                className="border p-2 w-full"
                placeholder="Material"
                value={variant.usageDetails.material}
                onChange={(e) =>
                  updateField(index, "usageDetails.material", e.target.value)
                }
              />

              <input
                className="border p-2 w-full"
                placeholder="Craft Time"
                value={variant.usageDetails.artisanTime}
                onChange={(e) =>
                  updateField(index, "usageDetails.artisanTime", e.target.value)
                }
              />
            </div>
          )}

          {/* MEDIA */}

          <div>
            <label>Images</label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImages(index, e.target.files)}
            />
          </div>

          <div>
            <label>Videos</label>

            <input
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => handleVideos(index, e.target.files)}
            />
          </div>
        </div>
      ))}

      <button type="button" onClick={addVariant} className="flex gap-2">
        <HiOutlinePlus />
        Add Variant
      </button>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onClose}>
          Cancel
        </button>

        <button type="submit">Save Variants</button>
      </div>
    </form>
  );
}

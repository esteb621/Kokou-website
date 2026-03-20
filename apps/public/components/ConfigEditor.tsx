"use client";

import { Config } from "@/lib/types";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trash2, Plus, Undo2 } from "lucide-react";

export default function ConfigEditor({
  config,
  setConfig,
}: {
  config: Config;
  setConfig: (config: Config) => void;
}) {
  const updateHero = (field: keyof Config["hero"], value: string) => {
    setConfig({ ...config, hero: { ...config.hero, [field]: value } });
  };

  const updateSocial = (key: string, field: string, value: string) => {
    setConfig({
      ...config,
      socials: {
        ...config.socials,
        [key]: { ...config.socials[key], [field]: value },
      },
    });
  };

  const addSocial = () => {
    const newKey = `social_${Object.keys(config.socials).length + 1}`;
    setConfig({
      ...config,
      socials: {
        ...config.socials,
        [newKey]: {
          label: "New Social",
          url: "",
          icon: "simple-icons:default",
        },
      },
    });
  };

  const toggleSocialDelete = (key: string, deleted: boolean) => {
    setConfig({
      ...config,
      socials: {
        ...config.socials,
        [key]: { ...config.socials[key], _deleted: deleted },
      },
    });
  };

  const updateSkill = (
    index: number,
    field: keyof Config["skills"][0],
    value: string,
  ) => {
    const newSkills = [...config.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setConfig({ ...config, skills: newSkills });
  };

  const addSkill = () => {
    setConfig({
      ...config,
      skills: [
        ...config.skills,
        { label: "New Skill", icon: "ph:sparkles", detail: "Detail" },
      ],
    });
  };

  const toggleSkillDelete = (index: number, deleted: boolean) => {
    const newSkills: any = [...config.skills];
    newSkills[index] = { ...newSkills[index], _deleted: deleted };
    setConfig({ ...config, skills: newSkills });
  };

  const updateProduct = (
    category: "avatars" | "assets",
    index: number,
    field: string,
    value: string | number,
  ) => {
    const newCategory = [...config.products[category]];
    newCategory[index] = { ...newCategory[index], [field]: value } as any;
    setConfig({
      ...config,
      products: { ...config.products, [category]: newCategory },
    });
  };

  const addProduct = (category: "avatars" | "assets") => {
    const defaultProduct = {
      priority: config.products[category].length + 1,
      title: "New Product",
      description: "Description",
      image: "",
      link: "",
      review: "5.0",
      price: "$0",
    };
    setConfig({
      ...config,
      products: {
        ...config.products,
        [category]: [...config.products[category], defaultProduct],
      },
    });
  };

  const toggleProductDelete = (category: "avatars" | "assets", index: number, deleted: boolean) => {
    const newCategory: any = [...config.products[category]];
    newCategory[index] = { ...newCategory[index], _deleted: deleted };
    setConfig({
      ...config,
      products: { ...config.products, [category]: newCategory },
    });
  };

  const TextareaClass =
    "flex min-h-[80px] w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex flex-col gap-8 ">
      {/* HERO SECTION */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-b pb-2">Hero Section</h3>
        <Card className="bg-primary/50 text-secondaryborder-0 shadow-xl">
          <CardContent className="grid gap-4">
            <Field>
              <FieldLabel>
                Section Name (e.g., 3D Artist & Content creator)
              </FieldLabel>
              <Input
                className="bg-secondary"
                value={config.hero.section}
                onChange={(e) => updateHero("section", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Title (last element will be gradient)</FieldLabel>
              <Input
                className="bg-secondary"
                value={config.hero.title}
                onChange={(e) => updateHero("title", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <textarea
                className={TextareaClass}
                value={config.hero.description}
                onChange={(e) => updateHero("description", e.target.value)}
              />
            </Field>
          </CardContent>
        </Card>
      </div>

      {/* SOCIALS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-xl font-bold">Social Links</h3>
          <Button
            variant="outline"
            className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200"
            size="lg"
            onClick={addSocial}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Social
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(config.socials).map(([key, social]) => (
            social._deleted ? (
              <Card key={key} className="bg-primary/50 flex flex-col items-center justify-center p-6 h-full min-h-[160px]">
                <span className="text-secondary font-bold mb-4">Element deleted</span>
                <Button variant="outline" className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200" onClick={() => toggleSocialDelete(key, false)}>
                  <Undo2 className="mr-2 h-4 w-4" /> Undo Action
                </Button>
              </Card>
            ) : (
            <Card key={key} className="bg-primary/50">
              <CardContent className="grid gap-3">
                <Field>
                  <FieldLabel>Label</FieldLabel>
                  <Input
                    className="bg-secondary"
                    value={social.label}
                    onChange={(e) => updateSocial(key, "label", e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel>URL</FieldLabel>
                  <Input
                    className="bg-secondary"
                    value={social.url}
                    onChange={(e) => updateSocial(key, "url", e.target.value)}
                  />
                </Field>
                <div className="flex gap-2 items-end">
                  <Field className="flex-1">
                    <FieldLabel>
                      Icon
                      <a
                        href="https://iconify.design/"
                        target="_blank"
                        className="text-text-secondary"
                      >
                        (Iconify)
                      </a>
                    </FieldLabel>
                    <Input
                      className="bg-secondary"
                      value={social.icon}
                      onChange={(e) =>
                        updateSocial(key, "icon", e.target.value)
                      }
                    />
                  </Field>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200"
                    onClick={() => toggleSocialDelete(key, true)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            )
          ))}
        </div>
      </div>

      {/* SKILLS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-xl font-bold">Skills & Tools</h3>
          <Button
            variant="outline"
            size="lg"
            className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200"
            onClick={addSkill}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Skill
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {config.skills.map((skill, index) => (
            skill._deleted ? (
              <Card key={index} className="bg-primary/50 flex flex-col items-center justify-center p-6 h-full min-h-[160px]">
                <span className="text-secondary font-bold mb-4">Element deleted</span>
                <Button variant="outline" className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200" onClick={() => toggleSkillDelete(index, false)}>
                  <Undo2 className="mr-2 h-4 w-4" /> Undo Action
                </Button>
              </Card>
            ) : (
            <Card key={index} className="bg-primary/50 text-secondarytext-secondaryshadow-xl">
              <CardContent className="grid gap-3">
                <Field>
                  <FieldLabel>Label</FieldLabel>
                  <Input
                    className="bg-secondary"
                    value={skill.label}
                    onChange={(e) =>
                      updateSkill(index, "label", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel>Detail</FieldLabel>
                  <Input
                    className="bg-secondary"
                    value={skill.detail}
                    onChange={(e) =>
                      updateSkill(index, "detail", e.target.value)
                    }
                  />
                </Field>
                <div className="flex gap-2 items-end">
                  <Field className="flex-1">
                    <FieldLabel>
                      Icon{" "}
                      <a
                        href="https://iconify.design/"
                        target="_blank"
                        className="text-text-secondary"
                      >
                        (Iconify)
                      </a>
                    </FieldLabel>
                    <Input
                      className="bg-secondary"
                      value={skill.icon}
                      onChange={(e) =>
                        updateSkill(index, "icon", e.target.value)
                      }
                    />
                  </Field>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200"
                    onClick={() => toggleSkillDelete(index, true)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            )
          ))}
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="space-y-8">
        <div className="border-b pb-2">
          <h3 className="text-xl font-bold">Products</h3>
        </div>

        {/* Avatars */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-muted-foreground">
              Avatars
            </h4>
            <Button
              variant="outline"
              size="lg"
              className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200"
              onClick={() => addProduct("avatars")}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Avatar
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {config.products.avatars.map((product, index) => (
              product._deleted ? (
                <Card key={index} className="bg-primary/50 flex flex-col items-center justify-center p-6 h-full min-h-[160px]">
                  <span className="text-secondary font-bold mb-4">Element deleted</span>
                  <Button variant="outline" className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200" onClick={() => toggleProductDelete("avatars", index, false)}>
                    <Undo2 className="mr-2 h-4 w-4" /> Undo Action
                  </Button>
                </Card>
              ) : (
              <Card key={index} className="bg-primary/50 shadow-xl border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex justify-between items-center">
                    <span>{product.title || "New Avatar"}</span>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200"
                      onClick={() => toggleProductDelete("avatars", index, true)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="flex gap-3">
                    <Field className="flex-[0.3]">
                      <FieldLabel>Priority</FieldLabel>
                      <Input
                        className="bg-secondary"
                        type="number"
                        value={product.priority || 0}
                        onChange={(e) =>
                          updateProduct(
                            "avatars",
                            index,
                            "priority",
                            parseInt(e.target.value) || 0,
                          )
                        }
                      />
                    </Field>
                    <Field className="flex-1">
                      <FieldLabel>Title</FieldLabel>
                      <Input
                        className="bg-secondary"
                        value={product.title}
                        onChange={(e) =>
                          updateProduct(
                            "avatars",
                            index,
                            "title",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <textarea
                      className={TextareaClass}
                      value={product.description}
                      onChange={(e) =>
                        updateProduct(
                          "avatars",
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                  <div className="flex gap-3">
                    <Field className="flex-1">
                      <FieldLabel>Price</FieldLabel>
                      <Input
                        className="bg-secondary"
                        value={product.price || ""}
                        onChange={(e) =>
                          updateProduct(
                            "avatars",
                            index,
                            "price",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field className="flex-[0.5]">
                      <FieldLabel>Review</FieldLabel>
                      <Input
                        className="bg-secondary"
                        value={product.review || ""}
                        onChange={(e) =>
                          updateProduct(
                            "avatars",
                            index,
                            "review",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel>Gumroad Link</FieldLabel>
                    <Input
                      className="bg-secondary"
                      value={product.link}
                      onChange={(e) =>
                        updateProduct("avatars", index, "link", e.target.value)
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Image URL</FieldLabel>
                    <Input
                      className="bg-secondary"
                      value={product.image}
                      onChange={(e) =>
                        updateProduct("avatars", index, "image", e.target.value)
                      }
                    />
                  </Field>
                </CardContent>
              </Card>
              )
            ))}
          </div>
        </div>

        {/* Assets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-muted-foreground">
              Assets
            </h4>
            <Button
              variant="outline"
              size="lg"
              className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200"
              onClick={() => addProduct("assets")}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Asset
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {config.products.assets.map((product, index) => (
              product._deleted ? (
                <Card key={index} className="bg-primary/50 flex flex-col items-center justify-center p-6 h-full min-h-[160px]">
                  <span className="text-secondary font-bold mb-4">Element deleted</span>
                  <Button variant="outline" className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200" onClick={() => toggleProductDelete("assets", index, false)}>
                    <Undo2 className="mr-2 h-4 w-4" /> Undo Action
                  </Button>
                </Card>
              ) : (
              <Card key={index} className="bg-primary/50 text-secondaryshadow-xl border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex justify-between items-center">
                    <span>{product.title || "New Asset"}</span>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="bg-text-secondary text-secondary hover:bg-text-secondary/70 hover:text-secondary transition-all duration-200"
                      onClick={() => toggleProductDelete("assets", index, true)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="flex gap-3">
                    <Field className="flex-[0.3]">
                      <FieldLabel>Priority</FieldLabel>
                      <Input
                        className="bg-secondary"
                        type="number"
                        value={product.priority || 0}
                        onChange={(e) =>
                          updateProduct(
                            "assets",
                            index,
                            "priority",
                            parseInt(e.target.value) || 0,
                          )
                        }
                      />
                    </Field>
                    <Field className="flex-1">
                      <FieldLabel>Title</FieldLabel>
                      <Input
                        className="bg-secondary"
                        value={product.title}
                        onChange={(e) =>
                          updateProduct(
                            "assets",
                            index,
                            "title",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <textarea
                      className={TextareaClass}
                      value={product.description}
                      onChange={(e) =>
                        updateProduct(
                          "assets",
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                  <div className="flex gap-3">
                    <Field className="flex-1">
                      <FieldLabel>Price (+ currency)</FieldLabel>
                      <Input
                        className="bg-secondary"
                        value={product.price || ""}
                        onChange={(e) =>
                          updateProduct(
                            "assets",
                            index,
                            "price",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field className="flex-[0.5]">
                      <FieldLabel>Review</FieldLabel>
                      <Input
                        className="bg-secondary"
                        value={product.review || ""}
                        onChange={(e) =>
                          updateProduct(
                            "assets",
                            index,
                            "review",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel>Jinxxy Link</FieldLabel>
                    <Input
                      className="bg-secondary"
                      value={product.link}
                      onChange={(e) =>
                        updateProduct("assets", index, "link", e.target.value)
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Image URL</FieldLabel>
                    <Input
                      className="bg-secondary"
                      value={product.image}
                      onChange={(e) =>
                        updateProduct("assets", index, "image", e.target.value)
                      }
                    />
                  </Field>
                </CardContent>
              </Card>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

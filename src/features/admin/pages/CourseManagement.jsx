import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";

import {
  getAllCourses,
  deleteCourse,
  publishCourse,
  archiveCourse,
} from "../../../services/firebase/courseService";

export default function CourseManagement() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    setLoading(true);
    setError("");

    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (err) {
      console.error("Failed to load courses:", err);

      setError(
        err?.message ||
          "Unable to load courses from Firestore."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(course) {
    const confirmed = window.confirm(
      `Delete "${course.title}" permanently?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setActionLoading(`delete-${course.id}`);

    try {
      await deleteCourse(course.id);

      setCourses((currentCourses) =>
        currentCourses.filter(
          (item) => item.id !== course.id
        )
      );
    } catch (err) {
      console.error("Failed to delete course:", err);

      alert(
        err?.message || "Unable to delete course."
      );
    } finally {
      setActionLoading("");
    }
  }

  async function handlePublishToggle(course) {
    const action = course.published
      ? "archive"
      : "publish";

    setActionLoading(`${action}-${course.id}`);

    try {
      if (course.published) {
        await archiveCourse(course.id);
      } else {
        await publishCourse(course.id);
      }

      await loadCourses();
    } catch (err) {
      console.error(
        `Failed to ${action} course:`,
        err
      );

      alert(
        err?.message ||
          `Unable to ${action} course.`
      );
    } finally {
      setActionLoading("");
    }
  }

  const filteredCourses = useMemo(() => {
    const keyword = searchText
      .trim()
      .toLowerCase();

    if (!keyword) {
      return courses;
    }

    return courses.filter((course) => {
      const title = String(
        course.title || ""
      ).toLowerCase();

      const category = String(
        course.category || ""
      ).toLowerCase();

      const level = String(
        course.level || ""
      ).toLowerCase();

      const status = String(
        course.status || ""
      ).toLowerCase();

      return (
        title.includes(keyword) ||
        category.includes(keyword) ||
        level.includes(keyword) ||
        status.includes(keyword)
      );
    });
  }, [courses, searchText]);

  function getStatus(course) {
    if (course.status === "archived") {
      return {
        label: "Archived",
        className:
          "bg-slate-100 text-slate-700",
      };
    }

    if (course.published) {
      return {
        label: "Published",
        className:
          "bg-green-100 text-green-700",
      };
    }

    return {
      label: "Draft",
      className:
        "bg-amber-100 text-amber-700",
    };
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Course Management
          </h1>

          <p className="mt-2 text-slate-500">
            Create, edit, publish and manage
            NextGenRoboticX courses.
          </p>
        </div>

        <Button
          leftIcon={<Plus size={18} />}
          onClick={() =>
            navigate("/admin/courses/new")
          }
        >
          New Course
        </Button>
      </div>

      <Card>
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by title, category, level or status..."
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
            />
          </div>

          <Button
            variant="outline"
            leftIcon={
              <RefreshCw size={17} />
            }
            onClick={loadCourses}
          >
            Refresh
          </Button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

              <p className="mt-4 text-slate-500">
                Loading courses...
              </p>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="py-20 text-center">
            <BookIcon />

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              {courses.length === 0
                ? "No Courses Yet"
                : "No Matching Courses"}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-slate-500">
              {courses.length === 0
                ? "Create your first course to start building the NextGenRoboticX learning platform."
                : "Try changing the search text to find the course you are looking for."}
            </p>

            {courses.length === 0 && (
              <div className="mt-6">
                <Button
                  leftIcon={
                    <Plus size={18} />
                  }
                  onClick={() =>
                    navigate(
                      "/admin/courses/new"
                    )
                  }
                >
                  Create First Course
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-slate-500">
              Showing{" "}
              <strong>
                {filteredCourses.length}
              </strong>{" "}
              of{" "}
              <strong>{courses.length}</strong>{" "}
              course
              {courses.length !== 1 ? "s" : ""}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                      Course
                    </th>

                    <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                      Category
                    </th>

                    <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                      Level
                    </th>

                    <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                      Price
                    </th>

                    <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                      Chapters
                    </th>

                    <th className="px-4 py-4 text-right text-sm font-semibold text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCourses.map(
                    (course) => {
                      const status =
                        getStatus(course);

                      const publishLoading =
                        actionLoading ===
                        `publish-${course.id}`;

                      const archiveLoading =
                        actionLoading ===
                        `archive-${course.id}`;

                      const deleteLoading =
                        actionLoading ===
                        `delete-${course.id}`;

                      return (
                        <tr
                          key={course.id}
                          className="border-b border-slate-100 transition hover:bg-slate-50"
                        >
                          <td className="px-4 py-5">
                            <div className="flex items-center gap-4">
                              {course.thumbnail ? (
                                <img
                                  src={
                                    course.thumbnail
                                  }
                                  alt={
                                    course.title
                                  }
                                  className="h-14 w-20 rounded-lg border object-cover"
                                />
                              ) : (
                                <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-blue-50 text-2xl">
                                  🤖
                                </div>
                              )}

                              <div>
                                <div className="font-semibold text-slate-900">
                                  {course.title ||
                                    "Untitled Course"}
                                </div>

                                <div className="mt-1 text-xs text-slate-400">
                                  {course.slug ||
                                    course.id}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-5 text-slate-700">
                            {course.category ||
                              "-"}
                          </td>

                          <td className="px-4 py-5 text-slate-700">
                            {course.level || "-"}
                          </td>

                          <td className="px-4 py-5 font-medium text-slate-800">
                            ₹
                            {Number(
                              course.price || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </td>

                          <td className="px-4 py-5">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                            >
                              {status.label}
                            </span>
                          </td>

                          <td className="px-4 py-5 text-slate-700">
                            {course.chapterCount ??
                              0}
                          </td>

                          <td className="px-4 py-5">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                leftIcon={
                                  <Pencil
                                    size={15}
                                  />
                                }
                                onClick={() =>
                                  navigate(
                                    `/admin/courses/${course.id}/edit`
                                  )
                                }
                              >
                                Edit
                              </Button>

                              <Button
                                size="sm"
                                variant={
                                  course.published
                                    ? "warning"
                                    : "success"
                                }
                                loading={
                                  publishLoading ||
                                  archiveLoading
                                }
                                leftIcon={
                                  course.published ? (
                                    <EyeOff
                                      size={15}
                                    />
                                  ) : (
                                    <Eye
                                      size={15}
                                    />
                                  )
                                }
                                onClick={() =>
                                  handlePublishToggle(
                                    course
                                  )
                                }
                              >
                                {course.published
                                  ? "Archive"
                                  : "Publish"}
                              </Button>

                              <Button
                                size="sm"
                                variant="danger"
                                loading={
                                  deleteLoading
                                }
                                leftIcon={
                                  <Trash2
                                    size={15}
                                  />
                                }
                                onClick={() =>
                                  handleDelete(
                                    course
                                  )
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

function BookIcon() {
  return (
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
      📚
    </div>
  );
}
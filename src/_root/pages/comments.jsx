import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { sendGreeting } from "@/services/greeting";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const constraintsRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "greetings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (constraintsRef.current) {
      const updateSize = () => {
        setContainerSize({
          width: constraintsRef.current.offsetWidth,
          height: constraintsRef.current.offsetHeight,
        });
      };

      updateSize();
      window.addEventListener('resize', updateSize);

      return () => window.removeEventListener('resize', updateSize);
    }
  }, [constraintsRef.current]);


  const generateNonOverlappingPositions = (count, containerWidth, containerHeight, cardWidth, cardHeight, padding = 20) => {
    const positions = [];
    if (containerWidth === 0 || containerHeight === 0) return [];

    for (let i = 0; i < count; i++) {
      let position;
      let tries = 0;
      do {
        const maxX = Math.max(0, containerWidth - cardWidth);
        const maxY = Math.max(0, containerHeight - cardHeight);
        position = {
          x: Math.random() * maxX,
          y: Math.random() * maxY,
        };
        tries++;
      } while (
        positions.some(p => (
          Math.abs(p.x - position.x) < cardWidth + padding &&
          Math.abs(p.y - position.y) < cardHeight + padding
        )) && tries < 100
      );
      positions.push(position);
    }
    return positions;
  };

  const randomPositions = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const cardWidth = isMobile ? 220 : 280;
    const cardHeight = 100;

    return generateNonOverlappingPositions(
      comments.length,
      containerSize.width,
      containerSize.height,
      cardWidth,
      cardHeight
    );
  }, [comments, containerSize]);


  const sendComment = async (e) => {
    e.preventDefault();
    const input = e.target[0];
    const text = input.value;

    if (!text.trim()) return;

    try {
      await sendGreeting(text);
      toast.success("Comment sent successfully!");
      input.value = "";
    } catch (error) {
      console.error("Failed to send comment:", error);
      toast.error("Failed to send comment.");
    }
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getCardStyle = () => ({
    ...commentCard,
    width: isMobile ? 220 : 280,
    position: 'absolute',
  });

  return (
    <div className="flex flex-col h-screen p-4 md:p-8 bg-background text-foreground">
      <Link to='/' className='text-2xl tracking-wider font-raleway'>../</Link>
      <div ref={constraintsRef} style={constraints}>
        {randomPositions.length > 0 && comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            initial={{
              x: randomPositions[index]?.x || 0,
              y: randomPositions[index]?.y || 0,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={getCardStyle()}
            whileDrag={{ scale: 1.05, zIndex: 10 }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={commentHeader}>
              <span style={authorName}>{comment.author || "Anonymous"}</span>
              <p style={timestamp}>
                {comment.createdAt?.toDate ? (
                  <>
                    <span>{format(comment.createdAt.toDate(), "yyyy-MM-dd")}</span>
                    <span className="ml-1 italic">({format(comment.createdAt.toDate(), "HH:mm")})</span>
                  </>
                ) : null}
              </p>
            </div>
            <p style={commentContent}>{comment.text}</p>
          </motion.div>
        ))}
      </div>

      <form
        className="mt-4 flex items-center gap-4 w-full max-w-2xl mx-auto"
        onSubmit={sendComment}>
        <input
          className="flex-1 py-3 border rounded-full px-5 bg-layer border-border"
          type="text"
          placeholder="Write a comment..."
        />
        <button type="submit" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold">Send</button>
      </form>
    </div>
  )
}

const constraints = {
  width: "100%",
  flexGrow: 1,
  position: "relative",
  overflow: "hidden",
  borderRadius: 10,
}

const commentCard = {
  backgroundColor: "var(--background)",
  borderRadius: 12,
  padding: 16,
  border: "1px solid var(--border)",
  cursor: "grab",
}

const commentHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
}

const authorName = {
  color: "var(--text-secondary)",
  fontWeight: 600,
  fontSize: 14,
}

const timestamp = {
  color: "var(--text-secondary)",
  fontSize: 12,
  fontWeight: 500,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}

const commentContent = {
  color: "var(--text-primary)",
  fontSize: 14,
  lineHeight: 1.5,
  margin: 0,
}

export default Comments;